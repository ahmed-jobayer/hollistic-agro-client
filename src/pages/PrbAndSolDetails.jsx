import { useLoaderData } from "react-router";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ProductCard from "../components/ProductCard";
import useAuth from "../hooks/useAuth";

const PrbAndSolDetails = () => {
  const axiosPublic = useAxiosPublic();
  const post = useLoaderData();
  const [product, setProduct] = useState(null);
  const {handleAddToCart} = useAuth()
  console.log(post, product);
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await axiosPublic.get(`/product/${post?.productId}`);
      setProduct(result.data); // Store response in state
    };
    fetchProduct();
  }, [post?.productId]); // Depend on `post?.productId`

  return (
    <div className="container mx-auto p-3">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <h2 className="text-center text-2xl font-medium my-4 mb-10">
            {post.title}
          </h2>
          <div>{parse(post?.postContent)}</div>
        </div>
        <div className="col-span-2 ">
          <div className="sticky top-0">
            <ProductCard product={product} 
            handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrbAndSolDetails;
