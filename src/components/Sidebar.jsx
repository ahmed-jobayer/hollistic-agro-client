import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineInventory2, MdOutlinePostAdd, MdOutlineSyncProblem } from "react-icons/md";
import { GrResume } from "react-icons/gr";
import { RiCouponLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoPeopleSharp } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import useUserData from "../hooks/useUserData";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import { RxBorderStyle } from "react-icons/rx";

const adminRoutes = [
  {
    id: 1,
    title: "My Products",
    route: "/dashboard/my-products",
    icon: <MdOutlineInventory2 className="text-xl" />,
  },
  {
    id: 2,
    title: "Categories",
    route: "/dashboard/categories",
    icon: <BiCategoryAlt className="text-xl" />,
  },
  {
    id: 3,
    title: "Add Products",
    route: "/dashboard/add-products",
    icon: <IoMdAddCircleOutline className="text-xl" />,
  },
  {
    id: 4,
    title: "Orders",
    route: "/dashboard/orders",
    icon: <RxBorderStyle className="text-xl" />,
  },
  {
    id: 5,
    title: "Cuopons",
    route: "/dashboard/coupons",
    icon: <RiCouponLine className="text-xl" />,
  },
  {
    id: 6,
    title: "Employees",
    route: "/dashboard/emplyees",
    icon: <IoPeopleSharp className="text-xl" />,
  },
  {
    id: 7,
    title: "Jobs",
    route: "/dashboard/jobs",
    icon: <MdOutlinePostAdd className="text-xl" />,
  },
  {
    id: 8,
    title: "Problem & Solutions",
    route: "/dashboard/problem-solution",
    icon: <MdOutlineSyncProblem className="text-xl" />,
  },
  {
    id: 9,
    title: "Applications",
    route: "/dashboard/applications",
    icon: <GrResume className="text-xl" />,
  },
];

const Sidebar = () => {
  const { user, loading } = useAuth();
  const [userData] = useUserData(user?.phoneNumber);
  if (loading) {
    return <Loader/>
  }
  return (
    <div className="   ">
      <h1 className="text-3xl  font-bold mb-8 text-center"> Holistic Agro </h1>
      <ul className="flex flex-col gap-4 h-full ">
        <NavLink
          to="/"
          className="btn btn-outline bg-primaryColor  border-none flex items-center text-white"
        >
          <IoHomeOutline className="text-xl" />
          <span>Home</span>
        </NavLink>
        {userData.role === "admin" &&
          adminRoutes.map((route) => (
            <NavLink
              key={route.id}
              to={route.route}
              className="btn btn-outline bg-primaryColor  border-none flex items-center text-white"
            >
              {route.icon}
              <span>{route.title}</span>
            </NavLink>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
