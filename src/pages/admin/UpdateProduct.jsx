import Select from "react-select";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useCategories from "../../hooks/useCategories";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [categories] = useCategories();
  const [selectedOption, setSelectedOption] = useState(null);
  const loadedProduct = useLoaderData();
  const navigate = useNavigate();

  const categoriesArray = categories.map((cat) => cat.category);

  const categoryOptions = categoriesArray.map((cat) => ({
    value: cat.toLowerCase().replace(/\s+/g, "-"),
    label: cat,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const title = data.title;
    const image1 = data.image1;
    const image2 = data.image2;
    const image3 = data.image3;
    const image4 = data.image4;
    const regularPrice = parseFloat(data.regularPrice);
    const offerPricerice = parseFloat(data.offerPricerice);
    const stock = parseFloat(data.stock);
    const category = selectedOption.label;
    const description = data.description;

    const product = {
      title,
      image1,
      image2,
      image3,
      image4,
      regularPrice,
      offerPricerice,
      stock,
      category,
      description,
    };
    // console.log(product);

    axiosPublic
      .patch(`/update-product/${loadedProduct._id}`, product)
      .then((res) => {
        if (res.data.modifiedCount) {
            console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/my-products");
        }
      });
  };

  return (
    <div className="w-full ">
      <h1 className="text-center font-bold text-3xl"> Update Product</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <div className="grid grid-cols-2 gap-6 ">
            {/* title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                defaultValue={loadedProduct.title}
                className="input input-bordered"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm font-light">
                  Title is required
                </p>
              )}
            </div>
            {/* image1 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image 1</span>
              </label>
              <input
                type="text"
                defaultValue={loadedProduct.image1}
                className="input input-bordered"
                {...register("image1", { required: true })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm font-light">
                  Image is required
                </p>
              )}
            </div>
            {/* image2 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image 2 (Optional)</span>
              </label>
              <input
                type="text"
                defaultValue={loadedProduct.image2}
                className="input input-bordered"
                {...register("image2", { required: false })}
              />
              {/* {errors.image && (
                <p className="text-red-500 text-sm font-light">
                  Image is required
                </p>
              )} */}
            </div>
            {/* image3 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image 3 (Optional)</span>
              </label>
              <input
                type="text"
                defaultValue={loadedProduct.image3}
                className="input input-bordered"
                {...register("image3", { required: false })}
              />
              {/* {errors.image && (
                <p className="text-red-500 text-sm font-light">
                  Image is required
                </p>
              )} */}
            </div>
            {/* image4 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image 4 (Optional)</span>
              </label>
              <input
                type="text"
                defaultValue={loadedProduct.image4}
                className="input input-bordered"
                {...register("image4", { required: false })}
              />
              {/* {errors.image && (
                <p className="text-red-500 text-sm font-light">
                  Image is required
                </p>
              )} */}
            </div>
            {/* category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <Select
                required
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={categoryOptions}
              />

              {errors.category && (
                <p className="text-red-500 text-sm font-light">
                  Category is required
                </p>
              )}
            </div>
            {/*regular price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Regular Price</span>
              </label>
              <input
                type="number"
                defaultValue={loadedProduct.regularPrice}
                className="input input-bordered"
                {...register("regularPrice", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm font-light">
                  Regular Price is required
                </p>
              )}
            </div>
            {/*offer price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Offer Price (Optional)</span>
              </label>
              <input
                type="number"
                defaultValue={loadedProduct.offerPricerice}
                className="input input-bordered"
                {...register("offerPricerice", { required: false })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm font-light">
                  Price is required
                </p>
              )}
            </div>
            {/* stock */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <input
                type="number"
                defaultValue={loadedProduct.stock}
                className="input input-bordered"
                {...register("stock", { required: true })}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm font-light">
                  Stock is required
                </p>
              )}
            </div>
          </div>

          {/* description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              defaultValue={loadedProduct.description}
              className="textarea textarea-bordered"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm font-light">
                Description is required
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-sm text-white bg-primaryColor border-none">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
