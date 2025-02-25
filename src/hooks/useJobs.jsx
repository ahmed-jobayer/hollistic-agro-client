import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useJobs = () => {
  const axiosPublic = useAxiosPublic();

  const { data: jobs = [], isPending, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async ()=> {
        const res = await axiosPublic.get("/jobs")
        return res.data
    }
  });

  return [jobs, isPending, refetch];
};
export default useJobs;
