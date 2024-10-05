import { FaCaretDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slice_store/usersApiSlice";
import { logout } from "../slice_store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [profileMenuVisibility, setProfileMenuVisibility] = useState(false);
  const [adminMenuVisibility, setAdminMenuVisibility] = useState(false);
  const profileMenuRef = useRef(null);
  const adminMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const LogoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const toggleProfileMenu = () => {
    console.log("profile Toggle");
    setProfileMenuVisibility(!profileMenuVisibility);
    setAdminMenuVisibility(false);
  };
  const toggleAdminMenu = () => {
    console.log("admin Toggle");
    setAdminMenuVisibility(!adminMenuVisibility);
    setProfileMenuVisibility(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuVisibility(false);
      }

      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setAdminMenuVisibility(false);
      }
    };

    // Attach the event listener once when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setProfileMenuVisibility(false);
    setAdminMenuVisibility(false);
  }, [userInfo]);

  return (
    <div className="w-1/2 flex items-center justify-between p-1">
      <div id="signin" className="md:mr-3">
        {userInfo ? (
          <>
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleProfileMenu}
            >
              {userInfo.name.split(" ")[0]} <FaCaretDown className="text-sm" />
            </div>
            {profileMenuVisibility && (
              <div
                ref={profileMenuRef}
                id="profileMenu"
                className="fixed top-16 p-1 right-18 w-36 rounded-md shadow-lg shadow-gray-500 bg-slate-200"
              >
                <Link to="/profile">
                  {" "}
                  <div className="text-black px-3">profile</div>
                </Link>
                <hr className=" bg-gray-400 h-0.5 my-1" />
                <div
                  className="text-black px-3 cursor-pointer"
                  onClick={LogoutHandler}
                >
                  Logout
                </div>
              </div>
            )}
          </>
        ) : (
          <Link to="/signin">
            <div className="flex items-center mr-5">
              <CgProfile className="text-2xl" />
              <span className="ml-2 text-lg">Sign in</span>
            </div>
          </Link>
        )}
      </div>

      <div id="isAdmin" className="flex items-center">
        {userInfo?.isAdmin ? (
          <div>
            <div
              onClick={toggleAdminMenu}
              className="flex items-center cursor-pointer"
            >
              Admin <FaCaretDown className="text-sm" />
            </div>

            {adminMenuVisibility && (
              <div
                ref={adminMenuRef}
                id="adminMenu"
                className="fixed  top-16 p-2 px-3 right-10 w-36 rounded-md shadow-lg shadow-gray-500 bg-slate-200"
              >
                <Link to="/orders">
                  <div className="text-black px-3">Orders</div>
                </Link>
                <hr className=" bg-gray-400 h-0.5 my-1" />
                <Link to="/products">
                  <div className="text-black px-3">Product List</div>
                </Link>
                <hr className=" bg-gray-400 h-0.5 my-1" />

                <Link to="/users">
                  {" "}
                  <div className="text-black px-3">UserList</div>
                </Link>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default UserProfile;
