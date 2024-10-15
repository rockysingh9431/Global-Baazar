import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slice_store/usersApiSlice";
const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const {
    data: user,
    refetch,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        userId,
        name,
        email,
        isAdmin,
      };
      const result = await updateUser(updatedUser);
      console.log(result);
      toast.success("User Updated Successfully");
      navigate("/admin/userlist");
      refetch();
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="pt-24 ">
      <h1 className="text-teal-900 font-bold text-4xl text-center">
        Edit User
      </h1>
      {loadingUpdateUser && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message success={true}>{error.data.message || error.error}</Message>
      ) : (
        <div className="flex justify-center text-lg text-slate-600 w-full mt-5">
          <form onSubmit={submitHandler} className="w-1/2">
            <div className="my-2" id="name">
              <label className="block">Name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              />
            </div>

            <div className="my-2" id="email">
              <label className="block">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              />
            </div>
            <div id="isAdmin" className="flex my-2 items-center">
              <span>Mark this box if you're the admin :</span>
              <input
                type="checkbox"
                label="is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 ml-3 rounded-md p-2"
              ></input>{" "}
            </div>

            <button
              type="submit"
              className="my-2 p-2 bg-slate-700 text-white rounded-md"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default UserEditScreen;
