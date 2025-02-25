import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUserData = (phone) => {

    const axiosPublic = useAxiosPublic()

    const {data: user=[], isPending, refetch} = useQuery({
        queryKey: ["user", phone],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${phone}`)
            return res.data
        },
        enabled: !!phone
    })

    return [user, isPending, refetch]
};

export default useUserData;