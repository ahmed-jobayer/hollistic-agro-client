import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Employees from "../pages/Employees";
import Career from "../pages/Career";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProducts from "../pages/admin/MyProducts";
import Categories from "../pages/admin/Categories";
import AddProducts from "../pages/admin/AddProducts";
import Login from "../pages/Login";
import AdminProductDetailsCard from "../pages/admin/AdminProductDetailsCard";
import UpdateProduct from "../pages/admin/UpdateProduct";
import CategoryWiseProducts from "../pages/CategoryWiseProducts";
import{BASE_URL} from "../config";
import MyOrders from "../pages/MyOrders";
import ProblemAndSolutions from "../pages/ProblemAndSolutions";
import AdminOrders from "../pages/admin/AdminOrders";
import Coupons from "../pages/admin/Coupons";
import AdminEmployees from "../pages/admin/AdminEmployees";
import Jobs from "../pages/admin/Jobs";
import SearchedProducts from "../pages/SearchedProducts";
import PrivateRoute from "./private/PrivateRoute";
import AdminRoutes from "./private/AdminRoutes";
import AboutUs from "../pages/AboutUs";
import RefundPolicy from "../pages/RefundPolicy";
import ReturnPolicy from "../pages/ReturnPolicy";
import Applications from "../pages/admin/Applications";
import AdminPrbAndSolu from "../pages/admin/AdminPrbAndSolu";
import PrbAndSolDetails from "../pages/PrbAndSolDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: '/',
        element:<Home/>
      },
      {
        path: '/searched-products',
        element:<SearchedProducts/>
      },
      {
        path: '/my-orders',
        element:<PrivateRoute><MyOrders/></PrivateRoute>
      },
      {
        path: '/problem-and-solutions',
        element:<ProblemAndSolutions/>
      },
      {
        path: '/problem-and-solution-details/:id',
        element:<PrbAndSolDetails/>,
        loader: ({params}) => fetch(`${BASE_URL}/post-by-id/${params.id}`)
      },
      {
        path: '/login',
        element:<Login/>
      },
      {
        path: '/employees',
        element:<Employees/>
      },
      {
        path: '/career',
        element:<Career/>
      },
      {
        path: '/about-us',
        element:<AboutUs/>
      },
      {
        path: '/refund-policy',
        element:<RefundPolicy/>
      },
      {
        path: '/return-policy',
        element:<ReturnPolicy/>
      },
      {
        path: '/product/:id',
        element:<ProductDetailsPage/>,
        loader: ({params}) => fetch(`${BASE_URL}/product/${params.id}`)
      },
       
      {
        path: '/products/:category',
        element:<CategoryWiseProducts/>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        path: '/dashboard/my-products',
        element: <PrivateRoute><AdminRoutes><MyProducts/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/add-products',
        element: <PrivateRoute><AdminRoutes><AddProducts/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/update-products/:id',
        element: <PrivateRoute><AdminRoutes><UpdateProduct/></AdminRoutes></PrivateRoute>,
        loader: ({params}) => fetch(`${BASE_URL}/product/${params.id}`),
        
      },
      {
        path: '/dashboard/view-product/:id',
        element:<PrivateRoute><AdminRoutes><AdminProductDetailsCard/></AdminRoutes></PrivateRoute>,
        loader: ({params}) => fetch(`${BASE_URL}/product/${params.id}`)
      },
      {
        path: '/dashboard/categories',
        element: <PrivateRoute><AdminRoutes><Categories/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/orders',
        element: <PrivateRoute><AdminRoutes><AdminOrders/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/coupons',
        element: <PrivateRoute><AdminRoutes><Coupons/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/emplyees',
        element: <PrivateRoute><AdminRoutes><AdminEmployees/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/jobs',
        element: <PrivateRoute><AdminRoutes><Jobs/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/problem-solution',
        element: <PrivateRoute><AdminRoutes><AdminPrbAndSolu/></AdminRoutes></PrivateRoute>
      },
      {
        path: '/dashboard/applications',
        element: <PrivateRoute><AdminRoutes><Applications/></AdminRoutes></PrivateRoute>
      },
      
    ]
  }
]);
