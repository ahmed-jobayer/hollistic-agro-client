import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useEmployes = () => {
    const axiosPublic = useAxiosPublic();

    const {
      data: employees = [], isPending,  refetch, } = useQuery({
      queryKey: ["employees"],
      queryFn: async () => {
        const res = await axiosPublic.get("/employees");
        return res.data;
      },
    });
  
    return [employees, isPending, refetch];
};

export default useEmployes;