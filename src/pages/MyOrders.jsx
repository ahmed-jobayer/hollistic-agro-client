import { useState } from "react";
import useOrders from "../hooks/useOrders";

const MyOrders = () => {
  const token = localStorage.getItem("access-token");
  const [orders, isPending] = useOrders(token);
  const [selectedOrder, setSelectedOrder] = useState(null);
    console.log(orders);
  //   console.log(selectedOrder);
  //   const shippingStatusOptions = [
  //     { value: "pending", label: "Pending" },
  //     { value: "processing", label: "Processing" },
  //     { value: "shipped", label: "Shipped" },
  //     { value: "delivered", label: "Delivered" },
  //     { value: "cancelled", label: "Cancelled" },
  //   ];

  return (
    <div className="container mx-auto min-h-screen py-6">
      <h2 className="font-medium text-center text-2xl">My Orders</h2>
      {isPending ? (
        <span className="loading loading-bars loading-lg"></span>
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
                  <td ><div className=" inline-block bg-primaryColor p-1 text-white rounded-md">{order?.status}</div></td>
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

export default MyOrders;
