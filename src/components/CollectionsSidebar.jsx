/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";

const CollectionsSidebar = ({ isSidebarOpen, toggleSidebar }) => {

  const [categories] = useCategories();

 
  return (
    <div
      className={`z-50 fixed h-full w-11/12 ${
        isSidebarOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={` top-0 left-0 w-full h-full bg-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } 
         transition-transform duration-300 `}
      >
        {/* Sidebar Items */}
        <ul className="p-4 pb-20 overflow-y-auto max-h-[80vh]">
          {categories.map((category, index) => (
            <li key={index} className="py-3 border-b font-medium">
              <Link to={`/products/${category?.category}`}
                onClick={toggleSidebar} // Close sidebar on link click
              >
                {category?.category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionsSidebar;
