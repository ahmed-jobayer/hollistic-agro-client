import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase-config/firebase";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useUserData from "../hooks/useUserData";
import Swal from "sweetalert2";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [, isPending, refetch] = useUserData(user?.phoneNumber);
  const [searchText, setSearchText] = useState("");


  const [storedCart, setStoredCart] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
  });

  console.log(user);

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const LogOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axiosPublic
          .post("/authentication", {
            phone: currentUser.phoneNumber,
          })
          .then((data) => {
            if (data.data) {
              localStorage.setItem("access-token", data?.data);
              setLoading(false);
            }
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [loading, axiosPublic]);

  // handle add to cart

  const handleAddToCart = async (_id, price) => {
    const quantity = 1;
    const data = {
      id: _id,
      price,
      quantity,
    };

    // get existing item from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if item already exists
    const existingItem = cart.find((item) => item.id === _id);

    if (existingItem) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "পণ্যটি ইতিমধ্যেই কার্টে আছে",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    } else {
      // add item to cart
      cart.push(data);
      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "পণ্যটি কার্টে যোগ করা হয়েছে",
        timer: 1000,
        showConfirmButton: false,
      });
      // console.log(cart);
      setStoredCart(cart);
      setIsCartOpen(true);
      // refetchById();
    }
  };

  const authInfo = {
    user,
    loading,
    LogOut,
    GoogleLogin,
    auth,
    isCartOpen,
    setIsCartOpen,
    isPending,
    refetch,
    handleAddToCart,
    searchText,
    setSearchText,
    storedCart,
    setStoredCart,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
