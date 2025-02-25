import axios from "axios";
import{BASE_URL} from "../config";





const useAxiosPublic = () => {
    const token = localStorage.getItem("access-token");
    const axiosPublic = axios.create({
        baseURL: BASE_URL, 
        headers: {
            authorization: `Bearer ${token}`,
          },
})
    return axiosPublic
};

export default useAxiosPublic;