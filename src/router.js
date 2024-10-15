import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import PrivateRouter from "./components/PrivateRouter";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import AdminRouter from "./components/AdminRouter";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import CreateProductScreen from "./screens/admin/CreateProductScreen";
import Header from "./navbar/Header";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: [<Header />, <Footer />],
    children: [
      {
        index: true,
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/search/:keyword",
        element: <HomeScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        path: "/signin",
        element: <SignInScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "",
        element: <PrivateRouter />,
        children: [
          {
            path: "/shipping",
            element: <ShippingScreen />,
          },
          {
            path: "/payment",
            element: <PaymentScreen />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrderScreen />,
          },
          {
            path: "/order/:id",
            element: <OrderScreen />,
          },
          {
            path: "/profile",
            element: <ProfileScreen />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminRouter />,
        children: [
          {
            path: "orders",
            element: <OrderListScreen />,
          },
          {
            path: "products",
            element: <ProductListScreen />,
          },
          {
            path: "product/:id/edit",
            element: <ProductEditScreen />,
          },
          {
            path: "Users",
            element: <UserListScreen />,
          },
          {
            path: "user/:id/edit",
            element: <UserEditScreen />,
          },
          {
            path: "products/create",

            element: <CreateProductScreen />,
          },
        ],
      },
    ],
  },
]);
export default router;
