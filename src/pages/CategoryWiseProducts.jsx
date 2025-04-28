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
      if (!res?.statusText === "OK") {
        Swal.fire("Failed to load data")
      }
      return res?.data
    },
    staleTime: 60000 // 1 minute before refetching the same data
  })

  
  
  if (isLoading) {
    return <Loader />;
  }
  const length  = products?.length

  return (
    <div className="min-h-screen">

    <div className="container mx-auto p-3 grid gap-3 lg:grid-cols-5 ">
      {length > 0 ? products?.map((product) => (
        <ProductCard handleAddToCart={handleAddToCart} product={product} key={product?._id} />
      ))
    : <p className=" min-h-screen lg:col-span-5  flex justify-center ">There is no products in this Category</p>
    }
    </div>
    </div>
  );
};

export default CategoryWiseProducts;
