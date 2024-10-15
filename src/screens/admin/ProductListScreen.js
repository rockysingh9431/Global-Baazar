import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slice_store/productApiSlice";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });
  const navigate = useNavigate();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete product?")) {
      try {
        deleteProduct(id);
        refetch();
        toast.success("Product Deleted");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to new product?")) {
      try {
        navigate("/products/create");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  return (
    <>
      <div className="pt-24 w-full">
        <div id="head" className="flex mx-auto w-11/12">
          <h1 className=" text-teal-950 font-bold text-4xl mb-5">Products</h1>

          <div className="flex justify-end w-full pb-3">
            <button
              className="text-white bg-slate-700 flex rounded-md p-2 items-center"
              onClick={createProductHandler}
            >
              <FaEdit /> Create Product
            </button>
          </div>
        </div>
      </div>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <div className="flex justify-center w-full">
          <table className="table-auto border-collapse  text-slate-600 w-11/12 text-center">
            <thead>
              <tr className="border-b border-slate-600 text-sm md:text-lg  ">
                <th className="p-2">Product No.</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${
                    !(index % 2) ? "bg-yellow-50" : ""
                  } border-b border-slate-600 text-xs md:text-sm text-teal-700`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      variant="light"
                      className="btn-sm mx-2"
                      onClick={() => {
                        deleteHandler(product._id);
                      }}
                    >
                      <FaTrash style={{ divor: "red" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default ProductListScreen;
