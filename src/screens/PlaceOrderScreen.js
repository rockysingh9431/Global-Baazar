import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../slice_store/orderApiSlice";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { clearCartItems } from "../slice_store/cartSlice";
const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="pt-24">
      <CheckOutSteps step1 step2 step3 step4 />
      <div className="flex justify-between pt-6 px-24">
        <div className=" w-2/3 p-3">
          <div id="shipping" className="p-2 pb-7 mb-5 border-b border-gray-300">
            <h2 className="text-3xl font-semibold text-teal-900 mb-3">
              Shipping
            </h2>
            <p className="text-lg text-slate-500">
              <strong>Address</strong>
              {": "} {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div
            id="payment-method"
            className="p-2 pb-7 mb-5 border-b border-gray-300"
          >
            <h2 className="text-3xl font-semibold text-teal-900 mb-3">
              Payment Method
            </h2>
            <p className="text-xl text-slate-500">
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="p-2 mb-5">
            <h2 className="text-3xl font-semibold text-teal-900 mb-5">
              Order Items
            </h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your Cart is Empty</Message>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-300 items-center p-2 pr-20 text-slate-500 text-md"
                  >
                    <div className="flex items-center justify-between">
                      <img
                        className="h-14 w-16 rounded-md  p-2"
                        src={item.image}
                        alt={item.name}
                      />
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </div>
                    <div md={4}>
                      ${item.price} x {item.quantity} = $
                      {(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-lg border border-gray-300 shadow-lg shadow-gray-300 bg-gray-100 rounded-md w-1/3 h-96">
          <h2 className="text-3xl text-teal-900 py-5 border-b-2 border-gray-300 text-center font-semibold">
            Order Summary
          </h2>
          <div className="flex justify-between border-b-2 border-gray-200 px-8 py-3 text-slate-700 font-semibold">
            <div>Items: </div>
            <div>${cart.itemsPrice}</div>
          </div>

          <div className="flex justify-between border-b-2 border-gray-200 px-8 py-3 text-slate-700 font-semibold">
            <div>Shipping: </div>
            <div>${cart.shippingPrice}</div>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 px-8 py-3 text-slate-700 font-semibold">
            <div>Tax: </div>
            <div>${cart.taxPrice}</div>
          </div>
          <div className="flex justify-between border-b-2 border-gray-200 px-8 py-3 text-slate-700 font-semibold">
            <div>Total: </div>
            <div>${cart.totalPrice}</div>
          </div>

          {error && <Message success={false}>{error.message}</Message>}

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              className="p-2 px-6 rounded-md text-white bg-slate-700"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrderScreen;
