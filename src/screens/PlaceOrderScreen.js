import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../slice_store/orderApiSlice";
import { button, div, div, div, Image, div } from "react-bootstrap";
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
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <div>
        <div md={8}>
          <div variant="flush">
            <div>
              <h2>Shipping</h2>
              <p>
                <strong>Address</strong>
                {":- "} {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2>Payment Method</h2>
              <strong>Method:-</strong>
              {cart.paymentMethod}
            </div>
            <div>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <div variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <div key={index}>
                      <div>
                        <div md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </div>
                        <div>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div md={4}>
          <div>
            <div variant="flush">
              <div>
                <h2>Order Summary</h2>
              </div>
              <div>
                <div>
                  <div>Items: </div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </div>
              <div>
                <div>
                  <div>Shipping: </div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </div>
              <div>
                <div>
                  <div>Tax: </div>
                  <div>${cart.taxPrice}</div>
                </div>
              </div>
              <div>
                <div>
                  <div>Total: </div>
                  <div>${cart.totalPrice}</div>
                </div>
              </div>
              <div>
                {error && <Message variant="danger">{error.message}</Message>}
              </div>
              <div>
                <button
                  type="button"
                  className="btn-block"
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
      </div>
    </>
  );
};
export default PlaceOrderScreen;
