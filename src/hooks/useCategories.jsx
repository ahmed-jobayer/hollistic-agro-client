import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: categories = [], isPending,  refetch, } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  return [categories, isPending, refetch];
};

export default useCategories;
