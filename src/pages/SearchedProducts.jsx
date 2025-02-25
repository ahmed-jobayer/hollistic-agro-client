import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const SearchedProducts = () => {
    const { searchText, setSearchText, handleAddToCart } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [products, setProducts] = useState([]); // Store searched products
    const [loading, setLoading] = useState(false);

    console.log(searchText);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!searchText) return; // Don't fetch if search text is empty
            setLoading(true);
            try {
                const res = await axiosPublic.get(`/search-products?title=${searchText}`);
                console.log(res.data)
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
                setSearchText(""); // Clear search text after fetching products
            }
        };

        fetchProducts();
    }, [searchText, axiosPublic, setSearchText]); // Re-run when searchText changes

    console.log(products);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Search Results for {searchText}</h2>

            {loading && <Loader/>}
            
            {products?.length === 0 && !loading && (
                <p className="text-gray-500">No products found.</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.map((product) => (
                    <ProductCard key={product._id} product={product} handleAddToCart={handleAddToCart}/>
                ))}
            </div>
        </div>
    );
};

export default SearchedProducts;