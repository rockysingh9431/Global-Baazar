import logo from "../assets/logo1.jpg";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import SearchBox from "./SearchBox";
import { RxHamburgerMenu } from "react-icons/rx";
import UserProfile from "./UserProfile";
import { useState } from "react";
import { useWindowWidth } from "../custom_hooks/windowWidth";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log("cartItems: ", cartItems);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { width } = useWindowWidth();

  if (width > 1024 && isNavbarOpen) setIsNavbarOpen(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <header
        className={`bg-blue-950 p-3 shadow-orange-100 shadow-lg h-20 my-auto fixed top-0 right-0 w-screen transition-all duration-0 ease-in-out${
          isNavbarOpen && "max-h-96"
        }`}
      >
        <nav className="text-slate-100 flex justify-between p-1 items-center">
          <div id="brand-logo" className="flex mx-3 items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10 rounded-sm" />
            </Link>
            <span className=" ml-4 text-orange-400 font-extrabold text-3xl font-serif">
              Global Baazar
            </span>
          </div>

          <div className="w-[40vw] hidden lg:block">
            <SearchBox />
          </div>
          <div
            id="right-bar"
            className="w-64 text-lg items-center justify-between hidden lg:flex"
          >
            <UserProfile />
            <div id="cart" className="flex items-center">
              <Link to="/cart">
                <div className="relative flex items-end text-orange-400">
                  <CiShoppingCart className="text-5xl" />
                  <span className="mb-1 font-sans font-bold">Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute transform translate-x-2.5 -translate-y-4 rounded-full w-8 h-4 flex items-center justify-center text-md text-orange-100 font-bold">
                      {cartItems.reduce(
                        (acc, curr) =>
                          acc + (curr.quantity ? curr.quantity : 0),
                        0
                      )}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          <div
            id="hamburger"
            className="sm:block lg:hidden text-3xl font-extrabold cursor-pointer"
            onClick={toggleNavbar}
          >
            <RxHamburgerMenu />
          </div>
        </nav>
        {/* Collapsible Navbar */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-linear ${
            isNavbarOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="flex justify-center mt-3 text-slate-100">
            <SearchBox />
          </div>
          <div
            id="right-bar"
            className="text-lg text-blue-50 w-full p-5 flex items-center justify-between"
          >
            <div id="userProfile" className="w-full">
              <UserProfile />
            </div>
            <div id="cart" className="flex">
              <Link to="/cart">
                <div className="relative flex items-end text-orange-400">
                  <CiShoppingCart className="text-5xl" />
                  <span className="mb-1 font-sans font-bold">Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute transform translate-x-2.5 -translate-y-4 rounded-full w-8 h-4 bg-gray-200-500 flex items-center justify-center text-md text-orange-200 font-bold">
                      {cartItems.reduce(
                        (acc, curr) =>
                          acc + (curr.quantity ? curr.quantity : 0),
                        0
                      )}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
