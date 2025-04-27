import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import useCoupons from "../../hooks/useCoupons";
import Loader from "../../components/Loader";

const Coupons = () => {
  const axiosPublic = useAxiosPublic();
  const [coupon, setCoupon] = useState("");
  const [couponValue, setCouponValue] = useState('');
  const [coupons, isPending, refetch] = useCoupons();
  const [hoveredCoupon, setHoveredCoupon] = useState(null);
  // console.log(coupons);
  

  const postCoupon = () => {
    const dbCoupon = { coupon, couponValue };
    // console.log(dbCoupon);
    if (dbCoupon) {
      axiosPublic.post("/add-coupon", dbCoupon).then((res) => {
        if (res.data.insertedId) {
          //   console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Coupon added successfully",
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
          setCoupon("");
          setCouponValue("");
          document.getElementById("my_modal_1").close();
        }
      });
    }
  };

  const deleteCoupon = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this coupon?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/delete-coupon/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Coupon deleted successfully",
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
              text: "Failed to delete the coupon.",
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
    return <Loader/>
  }

  return (
    <div className="w-full">
      <h2 className="text-center my-6 font-bold text-3xl"> Store Coupons</h2>
      {/* displayed coupons */}
      <div className="flex gap-4 flex-wrap">
        {coupons?.map((coupon) => (
          <div
            key={coupon?._id}
            className="relative group"
            onMouseEnter={() => setHoveredCoupon(coupon?._id)}
            onMouseLeave={() => setHoveredCoupon(null)}
          >
            <p className="text-white bg-primaryColor btn btn-outline">
              {coupon?.coupon}, {coupon?.couponValue} TK
            </p>
            {/* Cross icon */}
            {hoveredCoupon === coupon?._id && (
              <button
                onClick={() => deleteCoupon(coupon?._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add New coupon
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Coupon</h3>
            <div className="py-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Coupon Name</span>
                </div>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full max-w-xs focus:outline-primaryColor"
                />
                {/* coupon value */}
                <div className="label">
                  <span className="label-text">Coupon Value in TK</span>
                </div>
                <input
                  value={couponValue}
                  onChange={(e) => setCouponValue(Number(e.target.value))}
                  type="number"
                  placeholder="Value"
                  className="input input-bordered w-full max-w-xs focus:outline-primaryColor"
                />
              </label>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <button
                  onClick={postCoupon}
                  className="btn btn-outline bg-primaryColor text-white"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Coupons;
