import {  useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const CategoryWiseProducts = () => {
  const { handleAddToCart } = useAuth();
  const axiosPubluic = useAxiosPublic()
  const {category} = useParams();

  const {data: products, isLoading} = useQuery({
    queryKey: ['products', category],
    queryFn: async()=> {
      const res = await axiosPubluic.get(`/products/${category}`)
      console.log(res);
      if (!res?.statusText === "OK") {
        Swal.fire("Failed to load data")
      }
      return res?.data
    },
    staleTime: 60000 // 1 minute before refetching the same data
  })


  console.log({isLoading, products});

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="min-h-screen">

    <div className="container mx-auto p-3 grid gap-3 lg:grid-cols-5">
      {products?.map((product) => (
        <ProductCard handleAddToCart={handleAddToCart} product={product} key={product?._id} />
      ))}
    </div>
    </div>
  );
};

export default CategoryWiseProducts;
