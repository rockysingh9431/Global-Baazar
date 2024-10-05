import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slice_store/usersApiSlice";
import { setCredentials } from "../slice_store/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="pt-20">
      <h1 className="mt-5 font-serif text-4xl text-red-700 font-bold text-center">
        Sign Up
      </h1>
      <div id="signup-form" className="mt-5 flex justify-center ">
        <div className="border border-gray-300 shadow-md shadow-gray-400 p-5 px-10 min-w-[450px] w-[40vw]">
          <form onSubmit={submitHandler}>
            <div id="name" className="my-3">
              <label className="text-lg text-gray-700 block">Name</label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-green-900 p-2 px-4 rounded-md w-full"
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label className="text-lg text-gray-700 block">
                Email Address
              </label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-green-900 p-2 px-4 rounded-md w-full"
                type="email"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-3">
              <label className="text-lg text-gray-700 block">Password</label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-green-900 p-2 px-4 rounded-md w-full"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label className="text-lg text-gray-700 block">
                Confirm Password
              </label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-green-900 p-2 px-4 rounded-md w-full"
                type="confirmPassword"
                placeholder="Enter your Confirmation password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="pt-3 flex justify-between items-center">
              <div className="text-md">
                <span className="">ALready have and Account..? </span>
                <span className="text-blue-900 font-bold text-xl">
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Login
                  </Link>
                </span>
              </div>
              <button
                className="w-34 bg-red-700 hover:bg-red-900 text-white py-2 px-4 rounded-md"
                type="submit"
                variant="primary"
                disabled={isLoading}
              >
                Register
              </button>
            </div>
            {isLoading && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterScreen;
