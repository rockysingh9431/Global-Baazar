import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart, addToCart } from "../slice_store/cartSlice";
const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <div className="mt-3 bg-red-50">
      <div className="flex justify-center py-16">
        {cartItems.length === 0 ? (
          <Message>
            Your Cart Is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <div className="w-2/3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border border-gray-300 rounded-md  bg-white  shadow-lg shadow-gray-300 my-6"
              >
                <div className="w-2/4">
                  <img
                    src={item.image}
                    alt={item.image}
                    className="rounded-md h-56 w-72"
                  />
                </div>
                <div id="item-info" className="p-4 px-8">
                  <div className="text-3xl mb-4 font-semibold">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div className="text-gray-700 my-6">{item.description}</div>
                  <div className="flex justify-between w-5/6 text-lg">
                    <div>Price: ${(item.quantity * item.price).toFixed(2)}</div>
                    <div id="cart-info">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="border border-black w-20 rounded-md mr-3 p-1"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        type="button"
                        className="bg-gray-200"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-md p-2 border text-xl text-teal-950 border-gray-100 shadow-2xl bg-orange-200 shadow-gray-500 w-screen flex justify-around fixed bottom-0">
        <div className="flex  justify-between items-center p-2 w-1/2 text-2xl font-bold">
          <div>
            Total Items:
            {" " + cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </div>
          <div className=" flex items-center">
            Total Price: $
            {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
          </div>
        </div>
        <button
          type="button"
          className="bg-blue-900 p-2 rounded-md text-white"
          disabled={cartItems.length === 0}
          onClick={checkOutHandler}
        >
          CheckOut ▶️
        </button>
      </div>
    </div>
  );
};
export default CartScreen;
