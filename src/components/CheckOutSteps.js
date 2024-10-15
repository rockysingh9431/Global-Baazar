import { NavLink } from "react-router-dom";
const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center">
      <div className="flex justify-between w-[450px] text-slate-950 font-bold">
        <div>
          {step1 ? (
            <NavLink to="/signin">SignIn</NavLink>
          ) : (
            <div className="text-gray-400 cursor-pointer">SignIn</div>
          )}
        </div>
        <div>
          {step2 ? (
            <NavLink to="/shipping">
              <div>Shipping</div>
            </NavLink>
          ) : (
            <div className="text-gray-400 cursor-pointer">Shipping</div>
          )}
        </div>
        <div>
          {step3 ? (
            <NavLink to="/payment">Payment</NavLink>
          ) : (
            <div className="text-gray-400 cursor-pointer">Payment</div>
          )}
        </div>
        <div>
          {step4 ? (
            <NavLink to="/placeorder">
              <div>Place Order</div>
            </NavLink>
          ) : (
            <div className="text-gray-400 cursor-pointer">Place Order</div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default CheckOutSteps;
