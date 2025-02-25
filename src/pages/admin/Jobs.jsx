import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useJobs from "../../hooks/useJobs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Jobs = () => {
  const axiosPublic = useAxiosPublic();
  const [jobs, , refetch] = useJobs();
  const [hoveredJob, setHoveredJob] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const postJob = (data) => {
    console.log(data);
    axiosPublic.post("/add-job", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job added successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        refetch();
        reset(); // Reset the form
        document.getElementById("my_modal_1").close();
      }
    });
  };

  const deleteJob = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this job?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/delete-job/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Job deleted successfully",
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
              text: "Failed to delete the job.",
            });
          });
      }
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-center my-6 font-bold text-3xl">
        Holistic Agro Jobs
      </h2>

      {/* Display Employees */}
      <div className="grid gap-6 lg:grid-cols-3">
        <button
          className="btn btn-outline h-full"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add New Job
        </button>
        {jobs?.map((job) => (
          <div
            key={job?._id}
            className="relative group"
            onMouseEnter={() => setHoveredJob(job?._id)}
            onMouseLeave={() => setHoveredJob(null)}
          >
            <img src={job?.jobBannerImage} alt={job?.employeeType} />
            {hoveredJob === job?._id && (
              <button
                onClick={() => deleteJob(job?._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Modal for Adding job */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Job</h3>
            <form onSubmit={handleSubmit(postJob)} className="py-4">
              {/* Employee Image URL */}
              <div className="label">
                <span className="label-text">Job Banner URL</span>
              </div>
              <input
                {...register("jobBannerImage", { required: true })}
                type="text"
                placeholder="Enter Image URL"
                className="input input-bordered w-full max-w-xs focus:outline-primaryColor"
              />
              {errors.jobBannerImage && (
                <span className="text-red-500 text-sm">
                  Image URL is required
                </span>
              )}

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

export default Jobs;
