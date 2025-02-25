import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const UseProductsByIds = (product_ids) => {
    const axiosPublic = useAxiosPublic();

    const { data: productsById = [], isPending : loadingById, refetch: refetchById } = useQuery({
      queryKey: ["recentlyViewed", product_ids],
  
      queryFn: async () => {
        const res = await axiosPublic.post("/products-by-ids", {
          ids: product_ids,
        });
        return res.data;
      },
      enabled: product_ids.length > 0, // Only run if product_ids exist
    });
  
    return [productsById, loadingById, refetchById];
};

export default UseProductsByIds;


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axiosPublic.post("/products-by-ids", {
//           ids: product_ids, // Sending the product IDs
//         });

//         if (response.status === 200) {
//           setProducts(response.data);
//         } else {
//           console.error("Failed to fetch products");
//         }
//       } catch (error) {
//         console.error("Error fetching recently viewed products:", error.message);
//       }
//     };

//     if (product_ids.length > 0) {
//       fetchProducts();
//     }
//   }, [product_ids, axiosPublic]);