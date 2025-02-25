/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import {  useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Searchbar = ({ toggleSearchModal, isSearchModalOpen }) => {
  const searchInputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const {  setSearchText } = useAuth();
  const navigate = useNavigate();

  const handleSearchText = (e) => {
    e.preventDefault();
    setSearchText(e.target.search.value);
    navigate("/searched-products");
    toggleSearchModal();
  }


  useEffect(() => {
    if (isSearchModalOpen) {
      setIsVisible(true);
      searchInputRef.current?.focus();
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSearchModalOpen]);

  return (
    <div className={`fixed w-full h-full ${isVisible ? "z-50" : "-z-50"}`}>
      {/* backdrop */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-300
            ${isSearchModalOpen ? "opacity-75" : "opacity-0 "}`}
        onClick={toggleSearchModal}
      ></div>
      {/* total search bar */}

      <div
        className={`fixed top-0 left-0 right-0 w-full bg-white shadow-lg transform p-4 pb-8  ${
          isSearchModalOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close button */}
        <div className=" flex justify-between items-center lg:hidden">
          <h3 className="text-lg font-medium">Search in our store</h3>
          <RxCross1
            className="text-2xl cursor-pointer"
            onClick={toggleSearchModal}
          />
        </div>
        {/* logo search and icon */}
        <div className=" lg:flex items-center lg:px-20 justify-between">
          {/* logo */}
          <div className="hidden w-28 lg:flex">
            <img
              src="https://i.ibb.co.com/D7fgpMQ/logo-removebg-preview.png"
              alt=""
            />
          </div>
          {/* Search box */}
          <div className="py-4 lg:w-3/5">
            <form onSubmit={handleSearchText}>
              <label className="flex items-center border border-black rounded-lg p-3 shadow-md">
                <input
                  ref={searchInputRef}
                  type="search"
                  className="flex-grow outline-none"
                  placeholder="Search Products"
                  name="search"
                />
                <button type="submit">
                  <BsSearch className=" ml-4 text-black cursor-pointer" />
                </button>
              </label>
            </form>
          </div>
          {/* profile and cart logo */}
          <div className="hidden lg:flex items-center gap-6">
            <FaRegUser className="text-xl cursor-pointer" />
            <BiShoppingBag className="text-2xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
