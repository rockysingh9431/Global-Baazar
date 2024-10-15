import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return userInfo ? <Outlet /> : <Navigate to="/signin" replace />;
};
export default PrivateRouter;
