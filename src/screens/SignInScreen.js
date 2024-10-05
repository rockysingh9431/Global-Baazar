import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slice_store/usersApiSlice";
import { setCredentials } from "../slice_store/authSlice";
import { toast } from "react-toastify";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="p-24">
      <h1 className="text-center text-4xl font-bold text-red-700 font-serif">
        Sign In
      </h1>
      <div className="flex justify-center mt-5">
        <div
          id="signin-form"
          className="mt-5 shadow-lg shadow-gray-400 min-w-[450px] md:w-[40vw]"
        >
          <form onSubmit={submitHandler} className="px-10 py-5">
            <div id="email" className="text-gray-900">
              <label className="text-lg mb-1 block">Email Address</label>
              <input
                className="border border-slate-400 rounded-md p-3 w-full"
                type="email"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div id="password" className="text-gray-900 my-5">
              <label className="text-lg mb-1 block">Password</label>
              <input
                className="border border-slate-400 rounded-md p-3 w-full"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              id="login-signup"
              className="flex justify-between items-center"
            >
              <div id="new-user">
                <span>New Customer....? </span>
                <span className="text-blue-700 hover:text-blue-900 active:text-red-700 font-bold text-xl">
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                  >
                    Register here
                  </Link>
                </span>
              </div>
              <button
                className="w-34 bg-red-700 hover:bg-red-900 text-white py-2 px-4 rounded-md"
                type="submit"
                variant="primary"
                disabled={isLoading}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignInScreen;
