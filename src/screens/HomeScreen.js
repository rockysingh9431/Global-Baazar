import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slice_store/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";

const Homescreen = () => {
  const { keyword } = useParams();
  console.log(keyword);
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
  });
  return (
    <div className="mt-16 px-20 bg-orange-50">
      <h1 className="py-6 text-center text-5xl font-semibold text-slate-900">
        Latest Products
      </h1>
      {keyword ? (
        <button id="backBtn" className="ml-12 rounded-md p-3 bg-gray-300">
          <Link to="/">Go Back</Link>
        </button>
      ) : (
        <div className="mx-auto">{/* <ProductCarousel /> */}</div>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data?.message || error.error}</div>
      ) : (
        <>
          <div className="flex justify-center lg:justify-between  flex-wrap p-6">
            {data.products.map((product) => {
              return (
                <div
                  key={product._id}
                  className="rounded-md bg-white mb-10 shadow-lg shadow-gray-400 m-auto p-2 h-[330px] w-[18vw] xl:min-w-56 min-w-72"
                >
                  <Product key={product._id} product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default Homescreen;
