import { Link } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div className="p-3 border flex flex-col items-center gap-4 rounded-md hover:shadow-lg">
      <Link
        onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="flex flex-col items-center gap-3 flex-grow"
        to={`/product/${product?._id}`}
      >
        <img
          className="flex-grow w-full"
          src={product?.image1}
          alt={product?.title}
        />
        <h2>{product?.title}</h2>
        <div className="flex gap-3">
          <p className={`${product?.offerPrice <= 0 && "hidden"}`}>
            Tk {product?.offerPrice}
          </p>
          <p
            className={`${
              product?.offerPrice > 1 &&
              "line-through text-primaryColor text-sm"
            }`}
          >
            Tk {product?.regularPrice}
          </p>
        </div>
      </Link>
      <button
        onClick={() =>
          handleAddToCart(
            product?._id,
            product.offerPrice > 0 ? product.offerPrice : product.regularPrice
          )
        }
        className="bg-primaryColor btn w-4/5 text-white hover:bg-primaryColor hover:scale-105 duration-500"
      >
        Quick Add
      </button>
    </div>
  );
};

export default ProductCard;
