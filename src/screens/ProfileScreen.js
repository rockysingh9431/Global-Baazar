import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slice_store/usersApiSlice";
import { setCredentials } from "../slice_store/authSlice";
import { useGetMyOrdersQuery } from "../slice_store/orderApiSlice";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  console.log(orders);

  return (
    <div className="p-5 md:p-20 block md:flex justify-between flex-nowrap pt-24">
      <div className="w-full min-w-72 md:w-1/2 md:border-r-2 border-blue-950 ">
        <h2 className="font-bold text-3xl text-slate-800 text-center">
          User Profile
        </h2>
        <form onSubmit={submitHandler} className="">
          <div id="name" className="my-3">
            <label className="block text-2xl mb-1 text-teal-800">Name</label>
            <input
              className="focus:outline-none rounded-md min-w-64 w-11/12 border border-gray-300 focus:border-gray-800 p-1 px-2"
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div id="email" className="my-3">
            <label className="block text-2xl mb-1 text-teal-800">Email</label>
            <input
              className="focus:outline-none rounded-md min-w-64 w-11/12 border border-gray-300 focus:border-gray-800 p-1 px-2"
              type="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div id="password" className="my-3">
            <label className="block text-2xl mb-1 text-teal-800">
              Password
            </label>
            <input
              className="focus:outline-none rounded-md min-w-64 w-11/12 border border-gray-300 focus:border-gray-800 p-1 px-2"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div id="confirmPassword" className="my-3">
            <label className="block text-2xl mb-1 text-teal-800">
              Confirm Password
            </label>
            <input
              className="focus:outline-none rounded-md min-w-64 w-11/12 border border-gray-300 focus:border-gray-800 p-1 px-2"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>

          <button className="p-2 rounded-md text-white bg-gray-800 mt-3">
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
      <div className="mt-5 md:mt-0 md:pl-10 md:w-1/2 w-full">
        <h2 className="font-bold text-3xl text-slate-800 text-center mb-3">
          My Orders
        </h2>
        {isLoading ? (
          <></>
        ) : error ? (
          <Message className="w-full">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <table className="table-auto border-collapse border-2 border-red-900  table min-w-[21rem] w-full ">
            <thead className="border  border-red-950">
              <tr className="border border-red-950">
                <th className="w-1/2">ORDER NO.</th>
                <th className="w-1/2">DATE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${
                    index % 2 === 0 ? "bg-orange-100" : ""
                  } border-collapse border border-red-900 text-center`}
                >
                  <td>{index + 1}.</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td className="px-3">
                    <Link to={`/order/${order._id}`}>
                      <button className="rounded-md text-white bg-gray-800 p-0.5 px-2">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default ProfileScreen;
