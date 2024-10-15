import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slice_store/orderApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);
  return (
    <div className="pt-24 w-full">
      <h1 className="text-center text-teal-950 font-bold text-4xl mb-5">
        Total Orders
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <div className="flex justify-center w-full">
          <table className="table-auto border-collapse  text-slate-600 w-11/12 text-center">
            <thead>
              <tr className="border-b border-slate-600 text-sm md:text-lg ">
                <th className="p-2">Order No.</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${
                    !(index % 2) ? "bg-yellow-50" : ""
                  } border-b border-slate-600 text-xs md:text-sm text-teal-700`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <div className="flex justify-center">
                        <FaTimes style={{ color: "red" }} />
                      </div>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <div className="flex justify-center">
                        <FaTimes style={{ color: "red" }} />
                      </div>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button variant="primary">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default OrderListScreen;
