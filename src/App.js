import Navbar from "./navbar/Navbar";
import { Provider } from "react-redux";
import store from "./slice_store/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
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
        path: "/profile",
        element: <ProfileScreen />,
      },
      {
        path: "/order/:id",
        element: <OrderScreen />,
      },
    ],
  },
]);

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
      <ToastContainer />
    </HelmetProvider>
  );
};
export default App;
