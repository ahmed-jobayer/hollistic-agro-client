import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProducts from "../../hooks/useProducts";
import AdminProductCard from "./AdminProductCard";

const MyProducts = () => {
  const axiosPublic = useAxiosPublic();

  const [products, isPending, refetch] = useProducts();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/delete-product/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Product deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the product.",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Deletion cancelled",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <h2 className="text-center mt-6 mb-12 text-2xl font-semibold">
        <span className="border-b-2 border-black px-2">All Products</span>
      </h2>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {products?.map((product) => (
          <AdminProductCard
            handleDelete={handleDelete}
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
