import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useCategories from "../../hooks/useCategories";

const Categories = () => {
  const axiosPublic = useAxiosPublic();
  const [category, setCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categories, , refetch] = useCategories();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const postCategory = () => {
    const dbCategory = { category, categoryImage };
    // console.log(dbCategory);
    if (dbCategory) {
      axiosPublic
        .post(
          "/add-category",
          dbCategory
          //     , {
          //     headers: {
          //       authorization: `Bearer ${token}`,
          //     },
          //   }
        )
        .then((res) => {
          if (res.data.insertedId) {
            //   console.log(res.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Category added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
            setCategory("");
            setCategoryImage("")
            document.getElementById("my_modal_1").close();
          }
        });
    }
  };

  const deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this category?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/delete-category/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Category deleted successfully",
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
              text: "Failed to delete the category.",
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
      <h2 className="text-center my-6 font-bold text-3xl"> Store Categories</h2>
      {/* displayed category */}
      <div className="flex gap-4 flex-wrap">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(category._id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <p className="text-white bg-primaryColor btn btn-outline">
              {category.category}
            </p>
            {/* Cross icon */}
            {hoveredCategory === category._id && (
              <button
                onClick={() => deleteCategory(category._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add New Category
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Category</h3>
            <div className="py-4">
              
              <label className="form-control w-full max-w-xs">
              <div className="label">
                  <span className="label-text">Category Name</span>
                </div>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs focus:outline-primaryColor"
              />
              {/* category image */}
                <div className="label">
                  <span className="label-text">Category Image Link</span>
                </div>
                <input
                value={categoryImage}
                onChange={(e) => setCategoryImage(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs focus:outline-primaryColor"
                />
              </label>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <button
                  onClick={postCategory}
                  className="btn btn-outline bg-primaryColor text-white"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Categories;
