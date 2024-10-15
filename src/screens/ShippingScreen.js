import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slice_store/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div className="pt-24">
      <CheckOutSteps step1 step2 />
      <h1 className="text-center text-5xl text-slate-600 font-semibold my-5">
        Shipping
      </h1>
      <div className="w-full flex justify-center text-slate-500">
        <form onSubmit={submitHandler} className="w-[40vw]">
          <div className="my-2">
            <label className="block text-xl mb-1 text-slate-700">Address</label>
            <input
              className="focus:outline-none w-full rounded-md border border-gray-300 focus:border-gray-800 p-3"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div controlId="city" className="my-3">
            <label className="block text-xl mb-1 text-slate-700">City</label>
            <input
              className="focus:outline-none w-full rounded-md border border-gray-300 focus:border-gray-800 p-3"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div controlId="postalCode" className="my-3">
            <label className="block text-xl mb-1 text-slate-700">
              Postal Code
            </label>
            <input
              className="focus:outline-none w-full rounded-md border border-gray-300 focus:border-gray-800 p-3"
              type="text"
              placeholder="Enter your postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></input>
          </div>
          <div controlId="country" className="my-3">
            <label className="block text-xl mb-1 text-slate-700">Country</label>
            <input
              className="focus:outline-none w-full rounded-md border border-gray-300 focus:border-gray-800 p-3"
              type="text"
              placeholder="Enter your Country"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md text-white bg-gray-800 p-2"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
