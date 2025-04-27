import useAuth from "../hooks/useAuth";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [products, isPending] = useProducts();
  const {  handleAddToCart } = useAuth();

if (isPending) {
    return <span className="loading loading-dots loading-xl"></span>
  
}

  return (
    <div>
      <h2 className="text-center my-8 text-3xl font-medium ">All PRODUCTS</h2>
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-5 gap-6 p-3">
        {products.map((product) => (
          <ProductCard
            product={product}
            handleAddToCart={handleAddToCart}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
