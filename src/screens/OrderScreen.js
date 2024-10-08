import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slice_store/orderApiSlice";
import Divider from "../components/Divider";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch, ,] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  }
  async function createOrder(data, actions) {
    if (order) {
      return actions?.order
        ?.create({
          purchase_units: [
            {
              amount: {
                value: order.totalPrice,
              },
            },
          ],
        })
        .then((orderId) => {
          return orderId;
        });
    }
  }
  async function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  }
  async function onError(err) {
    toast.error(err?.message);
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message success={false} />
  ) : (
    <div className="pt-20 px-24 text-teal-900">
      <h1 className="text-4xl  font-bold">Order Id: {orderId}</h1>
      <div className="flex justify-between">
        <div className="w-3/5">
          <div className="text-lg p-5">
            <h2 className="text-3xl pb-5">Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              {order.user.email}
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{order.shippingAddress.country}
            </p>
            <div className="pt-3">
              {order.isDelivered ? (
                <Message success={true}>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message success={false}>Not Delivered</Message>
              )}
            </div>
          </div>
          <Divider color={"bg-slate-300"} />
          <div className="text-lg p-5">
            <h2 className="text-3xl pb-3">Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            <div className="pt-3">
              {order.isPaid ? (
                <Message success={true}>
                  Paid on {order.paidAt.toString()}{" "}
                </Message>
              ) : (
                <Message success={false}>Not Paid</Message>
              )}
            </div>
          </div>
          <Divider color={"bg-slate-300"} />
          <div className="text-lg p-5">
            <h2 className="text-3xl pb-5">Order Items</h2>
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between border-b border-teal-900"
              >
                <div className="flex items-center p-3 ">
                  <img
                    className="h-14 w-14 rounded-md mr-3"
                    src={item.image}
                    alt={item.name}
                  />

                  <Link to={`/product/${item.product}`} className="text-sm">
                    {item.name}
                  </Link>
                </div>

                <div md={4}>
                  ${item.price} x {item.quantity} = $
                  {(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 border border-gray-300 bg-gray-50 rounded-md h-2/3 py-3 shadow-md mt-5 shadow-gray-300">
          <div>
            <h2 className="font-bold text-3xl text-center">Order Summary</h2>
            <Divider color={"bg-slate-300"} />
            <div className="flex justify-between px-10 py-1">
              <div>Items:</div>
              <div>${order.itemsPrice}</div>
            </div>
            <Divider color={"bg-slate-300"} />
            <div className="flex justify-between px-10 py-1">
              <div>Shipping: </div>
              <div>${order.shippingPrice}</div>
            </div>
            <Divider color={"bg-slate-300"} />
            <div className="flex justify-between px-10 py-1">
              <div>Tax: </div>
              <div>${order.taxPrice}</div>
            </div>
            <Divider color={"bg-slate-300"} />
            <div className="flex justify-between px-10 py-1">
              <div>Total: </div>
              <div>${order.totalPrice}</div>
            </div>
            <Divider color={"bg-slate-300"} />
            {order.isPaid && (
              <div className="flex justify-between px-10 py-1">
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div className="w-full ">
                    <div className="flex justify-around p-2">
                      <button
                        onClick={onApproveTest}
                        className="bg-slate-900 text-white p-1 rounded-md"
                      >
                        Test Pay Order
                      </button>
                      {/*delivered status admin*/}
                      {loadingDeliver && <Loader />}
                      {userInfo &&
                        userInfo.isAdmin &&
                        order.isPaid &&
                        order.isDelivered && (
                          <button
                            type="button"
                            className="bg-slate-900 text-white p-1 rounded-md"
                            onClick={deliverOrderHandler}
                          >
                            Mark As Delivered
                          </button>
                        )}
                    </div>
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderScreen;
