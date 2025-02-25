import { useRef, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import usePrbAndSolPosts from "../../hooks/usePrbAndSolPosts";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import htmlTruncate from 'html-truncate';



const AdminPrbAndSolu = () => {
  const axiosPublic = useAxiosPublic();
  const [posts, , refetch] = usePrbAndSolPosts();
  const [hoveredPost, setHoveredPost] = useState(null);
  const [postContent, setPostContent] = useState("");
  const editor = useRef(null);
//   console.log(posts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddPost = (data) => {
    const dbpost = { ...data, postContent };
    console.log(dbpost);

    if (dbpost) {
      axiosPublic.post("/add-problem-and-solution-post", dbpost).then((res) => {
        if (res.data.insertedId) {
          //   console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Post added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          reset();
          setPostContent("");
        }
      });
    }
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/delete-problem-and-solution-post/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Post deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the post.",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Deletion cancelled",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };



  return (
    <div className="w-full">
      <h2 className="text-center my-6 font-bold text-3xl">
        {" "}
        Problem & Solutions{" "}
      </h2>

      {/* add post */}

      <div className="border p-4 rounded-xl">
        <h3 className="font-bold text-lg text-center my-4 mb-10">
          Add Problem And Solution Post
        </h3>

        <form onSubmit={handleSubmit(handleAddPost)}>
          <div className="w-full flex gap-4">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Post Title*</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500"> Title is Required</p>
              )}
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Suggested Product ID</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                {...register("productId")}
              />
            </label>
          </div>
          <JoditEditor
            value={postContent}
            onChange={(newContent) => {
              setPostContent(newContent);
            }}
            ref={editor}
            className="my-4 mt-10"
          />

          <button
            type="submit"
            onClick={handleAddPost}
            className="btn btn-sm bg-primaryColor text-white w-full hover:bg-primaryColor hover:scale-95 duration-500"
          >
            Add
          </button>
        </form>
      </div>

      {/* displayed post */}

      <h2 className="text-2xl text-center my-10">Added Posts</h2>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 ">
        {posts?.map((post) => (
          <div
            key={post?._id}
            className="relative group"
            onMouseEnter={() => setHoveredPost(post?._id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <div className="card bg-base-100 w-full shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{post?.title}</h2>
                <p>{parse(htmlTruncate(post?.postContent || '', 400, { ellipsis: '...' }))}</p>
              </div>
            </div>
            {/* Cross icon */}
            {hoveredPost === post?._id && (
              <button
                onClick={() => handleDeletePost(post?._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPrbAndSolu;
