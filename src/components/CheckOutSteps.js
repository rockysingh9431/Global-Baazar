import { NavLink } from "react-router-dom";
const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="justify-content-center mb-4">
      <div>
        {step1 ? (
          <NavLink to="/login">
            <div>SignIn</div>
          </NavLink>
        ) : (
          <div disabled>SignIn</div>
        )}
      </div>
      <div>
        {step2 ? (
          <NavLink to="/shipping">
            <div>Shipping</div>
          </NavLink>
        ) : (
          <div disabled>Shipping</div>
        )}
      </div>
      <div>
        {step3 ? (
          <NavLink to="/payment">
            <div>Payment</div>
          </NavLink>
        ) : (
          <div disabled>Payment</div>
        )}
      </div>
      <div>
        {step4 ? (
          <NavLink to="/placeorder">
            <div>Place Order</div>
          </NavLink>
        ) : (
          <div disabled>Place Order</div>
        )}
      </div>
    </nav>
  );
};
export default CheckOutSteps;
