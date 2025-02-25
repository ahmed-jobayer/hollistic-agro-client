import ProductCard from "./ProductCard";
import useAuth from "../hooks/useAuth";
import UseProductsByIds from "../hooks/UseProductsByIds";

const RecentlyViewedProducts = ({ product_ids }) => {
  const { handleAddToCart } = useAuth();

  const [productsById] = UseProductsByIds(product_ids)


  return (
    <div className="p-3 my-6">
      <h2 className="text-2xl text-center font-medium my-6">
        Recently Viewed Products
      </h2>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {productsById.map((product) => (
          <ProductCard
            handleAddToCart={handleAddToCart}
            product={product}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
