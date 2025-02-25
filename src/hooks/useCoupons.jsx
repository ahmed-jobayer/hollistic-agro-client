import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCoupons = () => {
    const axiosPublic = useAxiosPublic();

    const {
      data: coupons = [], isPending,  refetch, } = useQuery({
      queryKey: ["coupons"],
      queryFn: async () => {
        const res = await axiosPublic.get("/coupons");
        return res.data;
      },
      enabled: !!axiosPublic,
    });
  
    return [coupons, isPending, refetch];
};

export default useCoupons;