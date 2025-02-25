import { IoIosArrowDown } from "react-icons/io";
import parse from "html-react-parser";
import useAuth from "../hooks/useAuth";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetailsCard = ({ product }) => {
  const [shake, setShake] = useState(false);
  const { user, handleAddToCart, setIsCartOpen } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleOrder = (_id, price) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login first to place an order",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login", { state: { from: "/cart" } });
    } else {
      handleAddToCart(_id, price);
      setIsCartOpen(false)
      setTimeout(() => {
        document.getElementById("my_modal_1").showModal();
      }, 100);
    }
  };

  return (
    <div className="text-xl font-medium p-3 grid gap-8 lg:grid-cols-2">
      <img
        className="w-full object-cover"
        src={product?.image1}
        alt={product?.title}
      />
      <div>
        <h2 className="my-3">{product?.title}</h2>
        <div className="flex gap-3 items-center">
          <p className={`${product?.offerPrice <= 0 && "hidden"}`}>
            Tk {product?.offerPrice}
          </p>
          <p
            className={`${
              product?.offerPrice > 1 &&
              "line-through text-primaryColor text-sm"
            }`}
          >
            Tk {product?.regularPrice}
          </p>
        </div>
        <button
          onClick={() =>
            handleAddToCart(
              product?._id,
              product.offerPrice > 0 ? product.offerPrice : product.regularPrice
            )
          }
          className=" text-white btn w-full my-3 bg-black  border  hover:bg-black"
        >
          Add to cart
        </button>
        {/* OrderButton  */}
        <button
          onClick={() =>
            handleOrder(
              product?._id,
              product.offerPrice > 0 ? product.offerPrice : product.regularPrice
            )
          }
          className={`w-full text-white rounded-md bg-primaryColor  p-3 font-semibold flex gap-2 items-center justify-center
                                 ${shake ? "animate-shake" : ""}`}
        >
          <MdOutlineShoppingCart className="text-xl" />
          ক্যাশ অন ডেলিভারিতে অর্ডার করুন
        </button>
        <button
          onClick={() => window.open("https://m.me/holisticagro05", "_blank")}
          className="btn w-full my-3 mt-10 bg-black text-white hover:bg-black"
        >
          <img className="max-w-6" src="/messenger.png" alt="messenger logo" />
          Chat with us
        </button>
        <button
          onClick={() => window.open("https://wa.me/8801733326363", "_blank")}
          className="btn w-full my-3 bg-black text-white hover:bg-black"
        >
          <img className="max-w-7" src="/whatsapp.png" alt="whatsapp logo" />{" "}
          WhatsApp us
        </button>
        {/* collapse description */}
        <div className="collapse ">
          <input type="checkbox" />
          <div className="collapse-title flex items-center justify-between text-lg font-normal px-0 border-b-[1px] border-primaryColor rounded-none ml-0">
          পণ্যের বর্ণনা এবং ব্যবহারের নির্দেশাবলী <IoIosArrowDown />
          </div>
          <div className="collapse-content mt-6">
            <p>{parse(product?.description)}</p>
          </div>
        </div>
        <div className="text-xl font-semibold space-y-2">
          আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:
          <br />
          <a href="tel:+8801733326363" className="underline ">
            +8801733326363
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
