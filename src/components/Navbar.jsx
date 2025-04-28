import { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import CollectionsUnderNavbar from "./CollectionsUnderNavbar";
import HeadingText from "./HeadingText";
import CollectionsSidebar from "./CollectionsSidebar";
import Searchbar from "./Searchbar";
import SidebarCart from "./SidebarCart";
import useAuth from "../hooks/useAuth";
import useUserData from "../hooks/useUserData";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const {
    user: authUser,
    LogOut,
    isCartOpen,
    setIsCartOpen,
    storedCart,
  } = useAuth();
  // console.log(authUser?.phoneNumber );

  const [user, , refetch] = useUserData(authUser?.phoneNumber);

  const handleLogout = () => {
    LogOut();
    refetch();
  };

  // toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // toggle searchbar
  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };
  // toggle shopping cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Disable/enable scrolling based on sidebar open state
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling for the body
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling for the body
    }

    // Cleanup on unmount or when sidebar is closed
    return () => {
      document.body.style.overflow = "auto"; // Reset to default when component unmounts
    };
  }, [isSidebarOpen]);

  return (
    <nav >
      <HeadingText />
      {/* navbar */}
      <div className=" lg:w-8/12 mx-auto flex items-center justify-between p-2 text-primaryColor text-xl font-bold">
        <div
          className={`lg:hidden cursor-pointer transition-transform duration-300 ${
            isSidebarOpen ? "rotate-90" : "rotate-0"
          }`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <RxCross1 className="text-2xl transition-transform duration-300 " />
          ) : (
            <GiHamburgerMenu className="text-2xl transition-transform duration-300" />
          )}
        </div>

        <BsSearch
          className="hidden lg:flex cursor-pointer"
          onClick={toggleSearchModal}
        />
        <div className="font-bold">
          <Link to="/">
            <img 
              className="w-[70px]"
              src='/company-logo.png'
              alt="Holistic Agro Logo"
            />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <BsSearch
            className="lg:hidden cursor-pointer"
            onClick={toggleSearchModal}
          />
          {!user.phone ? (
            <Link className="btn btn-ghost btn-sm " to="/login">
              লগ ইন
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <FaRegUser className=" text-xl cursor-pointer" />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[2] mt-3 w-52 p-2 shadow"
              >
                {user?.role === "admin" && (
                  <li>
                    <Link to="/dashboard/my-products">Dashboard</Link>
                  </li>
                )}

                {user?.role === "user" && (
                  <>
                    <li>
                      <Link to="/my-orders">আমার অর্ডার বিবরণী</Link>
                    </li>
                  </>
                )}

                {user.phone && (
                  <li onClick={handleLogout}>
                    <a>লগ আউট</a>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className=" relative mr-2">
            <BiShoppingBag
              onClick={toggleCart}
              className="text-2xl cursor-pointer"
            />

            <span className="absolute -top-2 -right-4 bg-primaryColor text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {storedCart?.length}
            </span>
          </div>
        </div>
      </div>
      {/* collapsible sidebar for mobile */}
      <CollectionsSidebar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      {/* collections for large screen */}
      <CollectionsUnderNavbar />
      {/* searchbar */}
      <Searchbar
        toggleSearchModal={toggleSearchModal}
        isSearchModalOpen={isSearchModalOpen}
      />
      <SidebarCart toggleCart={toggleCart} isCartOpen={isCartOpen} />
    </nav>
  );
};

export default Navbar;
