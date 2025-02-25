import { useLoaderData } from "react-router";
import ProductCard from "../components/ProductCard";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const CategoryWiseProducts = () => {
  const products = useLoaderData();
  const { loading, isPending, handleAddToCart } = useAuth();

  console.log(products);
  if (loading && isPending) {
    <Loader/>
  }

  return (
    <div className="container mx-auto p-3 grid gap-3 lg:grid-cols-5">
      {products?.map((product) => (
        <ProductCard handleAddToCart={handleAddToCart} product={product} key={product?._id} />
      ))}
    </div>
  );
};

export default CategoryWiseProducts;
