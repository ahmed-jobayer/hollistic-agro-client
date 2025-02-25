import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useOrders = () => {

    const axiosPublic = useAxiosPublic();

    const {data: orders = [], isPending, refetch} = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosPublic.get("/orders");
            return res.data;
        },
    })

    return [orders, isPending, refetch];    
};

export default useOrders;