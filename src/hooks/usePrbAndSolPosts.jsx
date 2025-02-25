import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const usePrbAndSolPosts = () => {
    const axiosPublic = useAxiosPublic();

    const {
      data: posts = [], isPending,  refetch, } = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
        const res = await axiosPublic.get("/problem-and-solution-posts");
        return res.data;
      },
    });
  
    return [posts, isPending, refetch];
};

export default usePrbAndSolPosts;