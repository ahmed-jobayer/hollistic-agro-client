import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";

const CollectionsUnderNavbar = () => {
 
  const [categories] = useCategories();


  return (
    <div>
      <ul className="hidden lg:flex flex-wrap bg-[#f3f3f3]">
        {categories?.map((category) => (
          <li key={category?._id}>
            <button className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium  transition-all duration-300 ease-in-out transform ">
              <span className="relative z-10 flex items-center">
                <Link className="pb-[2px]" to={`/products/${category?.category}`}>
                <span className=" mx-1">{category?.category}</span>
                </Link>
                <span className="mt-1 absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsUnderNavbar;
