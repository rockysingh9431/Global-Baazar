import { Link } from "react-router-dom";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slice_store/usersApiSlice";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: Users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User Deleted");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  return (
    <div className="pt-24 ">
      <h1 className="text-4xl text-teal-900 font-bold text-center">
        Users List
      </h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <div className="flex justify-center w-full">
          <table className="table-auto border-collapse  text-slate-600 w-11/12 text-center">
            <thead>
              <tr className="border-b border-slate-600 text-sm md:text-lg ">
                <th className="p-2">ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    !(index % 2) ? "bg-yellow-50" : ""
                  } border-b border-slate-600 text-xs md:text-sm text-teal-700`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <div className="flex justify-center">
                        <FaCheck style={{ color: "green" }} />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <FaTimes style={{ color: "red" }} />
                      </div>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button variant="light">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </button>
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
export default UserListScreen;
