import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useEmployes from "../../hooks/useEmployes";
import { useForm } from "react-hook-form";

const AdminEmployees = () => {
  const axiosPublic = useAxiosPublic();
  const [employees, , refetch] = useEmployes();
  const [hoveredEmployee, setHoveredEmployee] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const postEmployee = (data) => {
    // console.log(data);
    axiosPublic.post("/add-employee", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Employee added successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        refetch();
        reset(); // Reset the form
        document.getElementById("my_modal_1").close();
      }
    });
  };

  const deleteEmployee = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this employee?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/delete-employee/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Employee deleted successfully",
                showConfirmButton: false,
                timer: 1000,
              });
              refetch();
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the employee.",
            });
          });
      }
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-center my-6 font-bold text-3xl">
        Holistic Agro Employees
      </h2>

      {/* Display Employees */}
      <div className="grid gap-6 lg:grid-cols-3">
        <button
          className="btn btn-outline h-full"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add New Employee
        </button>
        {employees?.map((employee) => (
          <div
            key={employee._id}
            className="relative group"
            onMouseEnter={() => setHoveredEmployee(employee._id)}
            onMouseLeave={() => setHoveredEmployee(null)}
          >
            <img src={employee.employeeImage} alt= {employee.employeeType}/>
            {hoveredEmployee === employee._id && (
              <button
                onClick={() => deleteEmployee(employee._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Modal for Adding Employee */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Employee</h3>
            <form onSubmit={handleSubmit(postEmployee)} className="py-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Employee Type</span>
                </div>

                <div className="py-5 bg-white flex flex-col gap-3 rounded-md">
                  <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
                    <input
                      type="radio"
                      {...register("employeeType", { required: true })}
                      value="Non Employee"
                      className="peer/html w-4 h-4 accent-current"
                    />
                    Non Employee
                  </label>

                  <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
                    <input
                      type="radio"
                      {...register("employeeType", { required: true })}
                      value="Employee"
                      className="peer/html w-4 h-4 accent-current"
                    />
                    Employee
                  </label>
                  {errors.employeeType && (
                    <span className="text-red-500 text-sm">
                      Please select an employee type
                    </span>
                  )}
                </div>

                {/* Employee Image URL */}
                <div className="label">
                  <span className="label-text">Employee Image URL</span>
                </div>
                <input
                  {...register("employeeImage", { required: true })}
                  type="text"
                  placeholder="Enter Image URL"
                  className="input input-bordered w-full max-w-xs focus:outline-primaryColor"
                />
                {errors.employeeImage && (
                  <span className="text-red-500 text-sm">
                    Image URL is required
                  </span>
                )}
              </label>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  ✕
                </button>
                <button
                  type="submit"
                  className="btn btn-outline bg-primaryColor text-white"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AdminEmployees;
