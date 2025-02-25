import { useState } from "react";
import useOrders from "../../hooks/useOrders";
import Select from "react-select";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AdminOrders = () => {
  const token = localStorage.getItem("access-token");
  const [orders, isPending, refetch] = useOrders(token);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const axiosPublic = useAxiosPublic();
  const shippingStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await axiosPublic.patch(
        `/update-order-status/${orderId}`,
        {
          status: newStatus,
        }
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Status Updated",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(orders, selectedOrder);

  return (
    <div className="container mx-auto min-h-screen py-6">
      <h2 className="font-medium text-center text-2xl my-5">All Orders</h2>
      {isPending ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table mt-2 h-full">
            {/* head */}
            <thead>
              <tr className="text-primaryColor">
                <th>SL</th>
                <th>Customer Name</th>
                <th>Order Details</th>
                <th>Total price</th>
                <th>Delivery Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}

              {orders?.map((order, i) => (
                <tr className="hover " key={order._id}>
                  <th>{i + 1}</th>
                  <td>{order?.name}</td>
                  <td>
                    <button
                      className="btn btn-sm bg-primaryColor text-white hover:bg-primaryColor"
                      onClick={() => {
                        document
                          .getElementById("order-details-modal")
                          .showModal(),
                          setSelectedOrder(order);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                  <td>{order?.total}</td>
                  <td>{order?.address}</td>
                  <td>
                    <Select
                      options={shippingStatusOptions}
                      value={shippingStatusOptions.find(
                        (option) => option.value === order?.status
                      )}
                      onChange={(selectedOption) =>
                        handleUpdateStatus(order._id, selectedOption.value)
                      }
                      menuPortalTarget={document.body}
                    />
                    {/* <div className=" inline-block bg-primaryColor p-1 text-white rounded-md">
                      {order?.status}
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* modal for order details */}

      <dialog id="order-details-modal" className="modal">
        <div className="modal-box lg:w-2/5 max-w-5xl ">
          <div className="py-4 grid grid-cols-1 gap-2">
            {/* user info */}

            {/* carted product table */}

            <table className="table">
              <tbody>
                {/* row  */}
                {selectedOrder?.orderItems?.map((itm, i) => (
                  <tr key={i} className="flex items-center font-bold">
                    <td>
                      <div className="h-12 w-12 relative">
                        <img src={itm?.image} alt={itm?.title} />
                        <span className="absolute -top-2 -right-4 bg-primaryColor text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {itm?.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="grow">{itm?.title}</td>
                    <td>Tk {itm?.price * itm?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <span className="font-medium text-lg">Note:</span>{" "}
              {selectedOrder?.note}
            </p>
            <p>
              <span className="font-medium text-lg">Shipping Method:</span>{" "}
              {selectedOrder?.shippingMethod}
            </p>
            {selectedOrder?.couponCode && (
              <p>
                <span className="font-medium text-lg">Used Coupon Code:</span>{" "}
                {selectedOrder?.couponCode}
              </p>
            )}
            {selectedOrder?.discount && (
              <p>
                <span className="font-medium text-lg">Discount Ammount:</span>{" "}
                {selectedOrder?.discount} Tk
              </p>
            )}

            <p>
              <span className="font-medium text-lg">Phone Number:</span>{" "}
              {selectedOrder?.phone}
            </p>
            <p>
              <span className="font-medium text-lg">User Login Number:</span>{" "}
              {selectedOrder?.userLoginNumber}
            </p>
          </div>
          {/* modal action */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminOrders;
