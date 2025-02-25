import { useLoaderData } from "react-router";
import PlatformInformation from "../components/PlatformInformation";
import ProductDetailsCard from "../components/ProductDetailsCard";
import RecentlyViewedProducts from "../components/RecentlyViewedProducts";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const ProductDetailsPage = () => {
  const {handleAddToCart} = useAuth()

  const product = useLoaderData();
  const [recentViewedProducts, setRecentViewedProducts] = useState([]);

  useEffect(()=> {
    const storedProducts = JSON.parse(localStorage.getItem("recentViewedProducts") || "[]")

    if (!storedProducts.includes(product?._id)) {
        const updatedProducts = [product?._id, ...storedProducts].slice(0, 10)
        localStorage.setItem("recentViewedProducts", JSON.stringify(updatedProducts))
    }else{
        setRecentViewedProducts(storedProducts)
    }
  }, [product?._id])

  return (
    <div className="">
      <ProductDetailsCard product={product} handleAddToCart={handleAddToCart}/>
      <PlatformInformation />
      <RecentlyViewedProducts product_ids={recentViewedProducts}/>
    </div>
  );
};

export default ProductDetailsPage;
