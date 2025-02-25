import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useJobs from "../hooks/useJobs";
import { useForm } from "react-hook-form";

const Career = () => {
  const [jobs] = useJobs();
  const axiosPublic = useAxiosPublic();

  // console.log(jobs);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleResumeSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const file = data.resume[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("file", file);
    const result = await axiosPublic.post("/upload-files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result) {
      Swal.fire({
        title: "Success",
        text: "Application submitted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // console.log(result.data)

    document.getElementById("apply-modal").close();
    reset();
  };

  return (
    <div className="container mx-auto p-3">
      <div className="grid grid-cols-2 ">
        <div className="flex justify-center  flex-col lg:pl-10">
          <h2 className="text-xl lg:text-4xl  font-semibold">
            Join Our Team AT <br />{" "}
            <span className="text-primaryColor">Holistic Agro</span>
          </h2>
          <p className="text-sm mt-2">
            Work at the most dynamic and successful company
          </p>
        </div>
        <img src="/hiring.jpg" alt="" />
      </div>
      <h2 className="text-center my-4 text-3xl font-medium">
        Job Opportunities
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {jobs?.map((job) => (
          <div
            key={job?._id}
            className="flex flex-col items-center border p-4 rounded-md border-primaryColor"
          >
            <img
              src={job?.jobBannerImage}
              alt={job?.employeeType}
              className=" object-cover"
            />
            <button
              onClick={() => document.getElementById("apply-modal").showModal()}
              className="btn mt-4 bg-primaryColor btn-outline text-white"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* modal for apply button */}

      <dialog id="apply-modal" className="modal">
        <div className="modal-box">
          <button
            onClick={() => document.getElementById("apply-modal").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form method="dialog" onSubmit={handleSubmit(handleResumeSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-light">
                  Full name is required.
                </p>
              )}
            </div>
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-light">
                  Email is required.
                </p>
              )}
            </div>
            {/* phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                className="input input-bordered"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm font-light">
                  Phone number is required.
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Resume (PDF)</span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                className="file-input file-input-bordered w-full"
                {...register("resume", { required: true })}
              />
              {errors.resume && (
                <p className="text-red-500 text-sm font-light">
                  Resume is required.
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <button className=" btn btn-sm text-white bg-primaryColor border-none  hover:bg-primaryColor hover:scale-95 duration-500">
                Apply
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Career;
