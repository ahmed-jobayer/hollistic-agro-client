import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic = useAxiosPublic();

    const {
      data: products = [], isPending,  refetch, } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await axiosPublic.get("/products");
        return res.data;
      },
    });
  
    return [products, isPending, refetch];
};

export default useProducts;