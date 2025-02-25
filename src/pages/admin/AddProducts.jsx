import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Select from "react-select";
import { useState,  useRef,  } from "react";
import useCategories from "../../hooks/useCategories";
import JoditEditor from 'jodit-react';

const AddProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [categories] = useCategories();
  const [selectedOption, setSelectedOption] = useState(null);
  const editor = useRef(null);
	const [description, setDescription] = useState('');

  const categoriesArray = categories.map((cat) => cat.category);
//   console.log(categoriesArray);

  const categoryOptions = categoriesArray.map((cat) => ({
    value: cat.toLowerCase().replace(/\s+/g, '-'),
    label: cat
  }))

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const title = data.title;
    const image1 = data.image1;
    const image2 = data.image2;
    const image3 = data.image3;
    const image4 = data.image4;
    const regularPrice = parseFloat(data.regularPrice);
    const offerPrice = parseFloat(data.offerPrice);
    const stock = parseFloat(data.stock);
    const category = selectedOption.label;

    const product = {
      title,
      image1,
      image2,
      image3,
      image4,
      regularPrice,
      offerPrice,
      stock,
      category,
      description,
    };
// console.log(product)


    axiosPublic .post("/add-product", product  )
      .then((res) => {
        if (res.data.insertedId) {
        //   console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setSelectedOption(null);
setDescription('');
        }
      });
  };

  return (
    <div className="w-full ">
      <h1 className="text-center font-bold text-3xl"> Add Products</h1>
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
                placeholder="Product Title"
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
                placeholder="Product Image"
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
                placeholder="Product Image"
                className="input input-bordered"
                {...register("image2", { required: false })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm font-light">
                  Image is required
                </p>
              )}
            </div>
            {/* image3 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image 3 (Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Product Image"
                className="input input-bordered"
                {...register("image3", { required: false })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm font-light">
                  Image is required
                </p>
              )}
            </div>
            {/* image4 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image 4 (Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Product Image"
                className="input input-bordered"
                {...register("image4", { required: false })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm font-light">
                  Image is required
                </p>
              )}
            </div>
            {/* category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={categoryOptions}
              />

              {errors.category && (
                <p className="text-red-500 text-sm font-light">
                  Title is required
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
                placeholder="Product Price"
                className="input input-bordered"
                {...register("regularPrice", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm font-light">
                  Price is required
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
                placeholder="Product Price"
                className="input input-bordered"
                {...register("offerPrice", { required: false })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm font-light">
                  Price is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <input
                type="number"
                placeholder="Product Stock"
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
            <JoditEditor
            ref={editor}
            value={description}
            onChange={(newContent)=> setDescription(newContent)}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-sm text-white bg-primaryColor border-none">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
