import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import useAuth from "../hooks/useAuth";
import useUserData from "../hooks/useUserData";
import Loader from "./Loader";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { BiSolidLocationPlus } from "react-icons/bi";
import useCoupons from "../hooks/useCoupons";
import UseProductsByIds from "../hooks/UseProductsByIds";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const SidebarCart = ({ isCartOpen, toggleCart }) => {
  const [shake, setShake] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [coupons] = useCoupons();
  const token = localStorage.getItem("access-token");
  const { user: authUser, loading, storedCart, setStoredCart } = useAuth();
  const [, isPending, refetch] = useUserData(authUser?.phoneNumber);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const cartIds = storedCart?.map((item) => item?.id);
  const [productsById] = UseProductsByIds(cartIds);

  const enrichedCart = storedCart.map((cartItem) => {
    const product = productsById.find((product) => product._id === cartItem.id);
    return {
      ...product,
      quantity: cartItem?.quantity,
    };
  });

  // console.log(enrichedCart);
  const cartItems = enrichedCart.map((item) => ({
    title: item?.title,
    image: item?.image1,
    price: item?.offerPrice || item?.regularPrice,
    quantity: item?.quantity,
  }));

  const total = storedCart?.reduce((acc, item) => {
    const price = parseFloat(item.price.$numberInt || item.price);
    const quantity = parseInt(item.quantity.$numberInt || item.quantity, 10);
    return acc + price * quantity;
  }, 0);

  const handleRemoveCartItems = async (_id, title) => {
    // Confirm action
    // console.log(_id, title);

    try {
      //  remove the item from local storage
      const updatedCart = storedCart.filter((item) => item.id !== _id);

      // Save updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setStoredCart(updatedCart);

      // Show success message
      Swal.fire({
        title: "Removed!",
        text: "আপনার কার্ট থেকে আইটেমটি সরানো হয়েছে।",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
      // Show error message
      Swal.fire({
        title: "Error!",
        text: "Failed to remove the item from your cart. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleRemoveCartItemsOpenModal = async (_id) => {
    //  remove the item from local storage
    const updatedCart = storedCart.filter((item) => item.id !== _id);

    // Save updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setStoredCart(updatedCart);
  };

  const handleQuantityChange = async (_id, quantityChange) => {
    // console.log(_id, quantityChange);

    const currentItem = storedCart.find((item) => item.id === _id);
    // console.log(currentItem);

    if (!currentItem) return;
    const newQuantity = currentItem.quantity + quantityChange;

    const updatedCart = storedCart.map((item) => {
      // console.log(storedCart);

      return item.id === _id ? { ...item, quantity: newQuantity } : item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setStoredCart(updatedCart);
  };

  const handleCouponApply = (coupon) => {
    const foundCoupon = coupons.find(
      (c) => c.coupon.toLowerCase() === coupon.toLowerCase()
    );
    if (foundCoupon) {
      setAppliedCoupon(foundCoupon);
      setDiscount(foundCoupon.couponValue);
    } else {
      setAppliedCoupon(null);
      setDiscount(0);
    }
    // console.log(coupon);
  };

  const handleCompletreOrder = (data) => {
    const status = "pending";
    const finalTotal = total + shippingPrice - discount;
    const orderData = {
      ...data,
      status,
      discount: appliedCoupon ? appliedCoupon.couponValue : 0,
      couponCode: appliedCoupon ? appliedCoupon.coupon : null,
      total: finalTotal,
      orderItems: cartItems,
    };
    console.log(orderData);

    axiosPublic
      .post("/add-order", orderData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.result.insertedId) {
          // console.log(res.data);
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে, ধন্যবাদ ',
            showConfirmButton: false,
            timer: 2000,
          });
          // close the modal
          const modal = document.getElementById("my_modal_1");
          if (modal) {
            modal.close();
          }
          // reset the form
          reset();
          // Clear local storage
          localStorage.removeItem("cart");
          setStoredCart([]);
        }
      });
  };

  if (loading && isPending) {
    return <Loader />;
  }

  return (
    <div>
      {/* Shopping Cart */}
      <div
        className={` fixed top-0 right-0 w-11/12 max-w-md bg-white shadow-lg h-full transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <RxCross1 className="text-2xl cursor-pointer" onClick={toggleCart} />
        </div>

        {/* cart content */}
        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="p-4 space-y-4 flex-grow overflow-y-auto">
            {/* map items */}
            {enrichedCart?.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 border-b pb-2 w-full"
              >
                <div className="w-2/5 border">
                  <img
                    src={item?.image1}
                    alt={item?.title}
                    className="w-full h-full object-cover "
                  />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <h3 className="font-semibold">{item?.title}</h3>
                  <p className=" font-semibold">
                    Tk {item?.offerPrice || item.regularPrice}
                  </p>
                  <div className="flex gap-5">
                    <div className="bg-[#f1f1f1]  px-4 w-1/2 rounded-md flex items-center justify-between mt-2">
                      <span
                        className="cursor-pointer p-2"
                        onClick={() =>
                          item?.quantity > 1
                            ? handleQuantityChange(item?._id, -1)
                            : Swal.fire({
                                title: "Minimum Quantity Reached",
                                text: "You cannot reduce the quantity below 1.",
                                icon: "info",
                                confirmButtonColor: "#3085d6",
                              })
                        }
                      >
                        -
                      </span>
                      <span>{item?.quantity}</span>
                      <span
                        className="cursor-pointer p-2"
                        onClick={() => handleQuantityChange(item?._id, 1)}
                      >
                        +
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveCartItems(item?._id, item?.title)
                      }
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal and Checkout */}
          <div className="p-4 border-t mb-[65px]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">আপনার মোট টাকা:</span>
              <span className="font-bold">Tk {total?.toFixed(2)}</span>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <button
              onClick={() => {
                if (!authUser) {
                  Swal.fire({
                    icon: "info",
                    title: "অর্ডার করতে হলে আপনাকে মোবাইল নাম্বার দিয়ে লগইন করতে হবে",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  toggleCart();
                  navigate("/login", { state: { from: "/cart" } });
                } else {
                  document.getElementById("my_modal_1").showModal();
                  toggleCart();
                }
              }}
              className={` mb-4 w-full bg-primaryColor  p-3 font-semibold rounded-sm flex gap-2 items-center justify-center
                         ${shake ? "animate-shake" : ""}`}
            >
              <MdOutlineShoppingCart className="text-xl" />
              ক্যাশ অন ডেলিভারিতে অর্ডার করুন
            </button>
          </div>
        </div>
      </div>

      {/* backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        ></div>
      )}

      {/* modal for order */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box lg:w-2/5 max-w-5xl ">
          <h3 className="font-bold text-xl text-center">
            ক্যাশ অন ডেলিভারিতে
            <br />
            অর্ডার করতে আপনার তথ্য দিন
          </h3>
          <div className="py-4">
            {/* user info */}
            <form
              onSubmit={handleSubmit(handleCompletreOrder)}
              className="grid grid-cols-1 gap-2"
            >
              <div className="grid lg:grid-cols-5 gap-1 lg:gap-2">
                <p>
                  আপনার নাম<span className="text-primaryColor ">*</span>
                </p>
                <label className="input input-bordered flex items-center gap-2 col-span-4">
                  <FaUser />
                  <input
                    type="text"
                    className="grow "
                    placeholder="আপনার নাম"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-sm">
                      {errors?.name?.message}
                    </p>
                  )}
                </label>

                <p>
                  ফোন নাম্বার<span className="text-primaryColor ">*</span>
                </p>
                <label className="input input-bordered flex items-center gap-2 col-span-4">
                  <FaPhoneAlt />
                  <input
                    type="text"
                    className="grow "
                    placeholder="ফোন নাম্বার"
                    {...register("phone", {
                      required: "Phone Number is required",
                    })}
                  />
                  {errors?.phone && (
                    <p className="text-red-500 text-sm">
                      {errors?.name?.message}
                    </p>
                  )}
                </label>
                <p>
                  এড্রেস<span className="text-primaryColor ">*</span>
                </p>
                <label className="input input-bordered flex items-center gap-2 col-span-4">
                  <BiSolidLocationPlus />
                  <input
                    type="text"
                    className="grow "
                    placeholder="এড্রেস"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors?.address && (
                    <p className="text-red-500 text-sm">
                      {errors?.name?.message}
                    </p>
                  )}
                </label>
              </div>

              {/* shipping method */}
              <h2 className="font-medium text-lg my-2">শিপিং মেথড</h2>

              <div className=" py-5 bg-white flex flex-col gap-3 rounded-md ">
                <label
                  htmlFor="rajshahi"
                  className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none"
                >
                  <input
                    type="radio"
                    id="rajshahi"
                    value="Rajshahi City"
                    {...register("shippingMethod", {
                      required: "Shipping Method is required",
                    })}
                    onChange={() => setShippingPrice(70)}
                    className="peer/html w-4 h-4 accent-current "
                  />
                  <p className="grow">রাজশাহী ভিতরে</p>
                  Tk 70.00
                </label>

                <label
                  htmlFor="outsideRajshahi"
                  name="html"
                  className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none"
                >
                  <input
                    type="radio"
                    id="outsideRajshahi"
                    value="Outside Rajshahi City"
                    {...register("shippingMethod", {
                      required: "Shipping Method is required",
                    })}
                    onChange={() => setShippingPrice(120)}
                    className="peer/html w-4 h-4  accent-current "
                  />
                  <p className="grow">রাজশাহী বাহিরে</p>
                  Tk 120.00
                </label>
              </div>

              {/* coupon */}
              <div className="flex gap-2 ">
                <input
                  placeholder="কুপন কোড"
                  className="input input-bordered grow"
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <p
                  onClick={() => handleCouponApply(coupon)}
                  className="bg-primaryColor hover:bg-primaryColor btn text-white px-6"
                >
                  এপ্লাই
                </p>
              </div>
              <div>
                {appliedCoupon && (
                  <p className="text-green-600">
                    কুপন সফলভাবে প্রয়োগ করা হয়েছে
                  </p>
                )}

                <div className="divider"></div>
              </div>
              {/* carted product table */}

              <div className="">
                <table className="table">
                  <tbody>
                    {/* row  */}
                    {enrichedCart?.map((itm, i) => (
                      <tr key={i} className="flex items-center font-bold">
                        <td>
                          <div className="h-12 w-12 relative">
                            <img src={itm?.image1} alt={itm?.title} />
                            <span className="absolute -top-2 -right-4 bg-primaryColor text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                              {itm?.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="grow">{itm?.title}</td>
                        <td>
                          Tk{" "}
                          {itm?.offerPrice || itm.regularPrice * itm?.quantity}
                        </td>
                        <td>
                          <p
                            onClick={() =>
                              handleRemoveCartItemsOpenModal(itm?._id)
                            }
                            className=" text-lg cursor-pointer"
                          >
                            X
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* show total price */}
              <div className="p-2 bg-[#ebebeb] rounded-lg my-4">
                <div className="flex mb-1">
                  <p className="grow">সাব টোটাল</p>
                  <p className="font-bold">Tk {total?.toFixed(2)}</p>
                </div>
                <div className="flex">
                  <p className="grow">ডেলিভারি চার্জ</p>
                  <p className="font-bold">Tk {shippingPrice?.toFixed(2)}</p>
                </div>
                <div className="divider my-2"></div>
                <div className="flex font-bold">
                  <p className="grow">সর্বমোট</p>
                  <p>Tk {(total + shippingPrice).toFixed(2)}</p>
                </div>
                {discount && (
                  <>
                    <div className="flex font-bold">
                      <p className="grow">ছাড়</p>
                      <p className="text-red-600">- Tk {discount.toFixed(2)}</p>
                    </div>
                    <div className="flex font-bold">
                      <p className="grow">মোট টাকা</p>
                      <p>Tk {(total + shippingPrice - discount).toFixed(2)}</p>
                    </div>
                  </>
                )}
              </div>

              {/* note */}
              <h3 className="font-medium mb-1">অর্ডার সম্পর্কে আপনার যদি কোন তথ্য থাকে, তাহলে দয়া করে লিখুন।</h3>
              <input
                placeholder="এখানে লিখুন..."
                className="input input-bordered  w-full"
                type="text"
                {...register("note")}
              />

              {/* order button */}

              <button
                type="submit"
                className="bg-primaryColor hover:bg-primaryColor btn text-white w-full my-4"
              >
                আপনার অর্ডার কনফার্ম করতে ক্লিক করুন
              </button>
            </form>
            {/* warning text */}
            <p className="text-center text-xl text-[#1d9e06]">
              উপরের বাটনে ক্লিক করলে আপনার অর্ডারটি সাথে সাথে কনফার্ম হয়ে যাবে !
            </p>
          </div>
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

export default SidebarCart;
