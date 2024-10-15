import { useState, useEffect } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slice_store/cartSlice";
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="pt-24">
      <CheckOutSteps step1 step2 step3 />
      <h1 className="text-center text-teal-950 text-4xl mt-6 font-bold">
        Payment Method
      </h1>
      <div className="flex justify-center w-full">
        <form onSubmit={submitHandler}>
          <label className="block text-2xl text-teal-900 mt-4 font-semibold">
            Select Method
          </label>

          <input
            type="radio"
            className="my-2"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <span className="font-semibold text-slate-600">
            Paypal / Credit / Debit Cards
          </span>
          <button
            type="submit"
            className="block my-2 bg-slate-700 text-white p-2 rounded-md"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default PaymentScreen;
