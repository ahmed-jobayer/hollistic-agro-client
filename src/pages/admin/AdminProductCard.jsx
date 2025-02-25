import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleDelete }) => {
    return (
        <div className="card  max-h-96 shadow-xl">
        <figure>
          <img src={product?.image1} alt={product.title} />
        </figure>
        <div className="card-body">
          <p className=" font-semibold">Tk {product?.regularPrice}</p>
          <h2 className="card-title">{product?.title}</h2>
  
          <div className="flex justify-between gap-4">
            <button
              onClick={() => handleDelete(product?._id)}
              className=" btn btn-sm bg-primaryColor text-white hover:text-black border-none"
            >
              Delete
            </button>
            <Link to={`/dashboard/update-products/${product?._id}`}>
              <button className=" btn btn-sm border-none bg-primaryColor text-white hover:text-black">
                Edit
              </button>
            </Link>
            <Link to={`/dashboard/view-product/${product?._id}`}>
              <button className=" btn btn-sm  border-none bg-primaryColor text-white hover:text-black">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default AdminProductCard;