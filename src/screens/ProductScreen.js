import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slice_store/productApiSlice";
import Loader from "../components/Loader";
import { addToCart } from "../slice_store/cartSlice";
import Meta from "../components/Meta";
import Reviews from "../components/Reviews";
const ProductScreen = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="mt-3 p-20 px-40">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message || error.error}</Message>
      ) : (
        <div>
          <Link to="/">
            <button className="bg-gray-200 p-3 mb-12 font-bold rounded-md text-md">
              Back to Home
            </button>
          </Link>
          <Meta title={product.name} />
          <div className="flex justify-between">
            {/* Product Image */}
            <div className="w-1/3">
              <img
                src={product.image}
                alt={product.name}
                className="h-80 rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="w-1/2 p-8">
              <h3 className="text-3xl font-bold">{product.name}</h3>
              <hr className="my-3 h-0.5 bg-red-950" />
              <p className="mt-2">{product.description}</p>
              <hr className="my-3 h-0.5 bg-red-950" />

              <Rating
                rating={product.rating}
                numReviews={`${product.numReviews} reviews`}
              />
              <hr className="my-3 h-0.5 bg-red-950" />

              <p className="mt-2 text-lg">Price: ${product.price}</p>
            </div>
            {/* Cart & Purchase */}
            <div className="border p-4 shadow-lg shadow-gray-400 rounded-md w-1/4">
              <p className="text-xl font-semibold text-center">
                Price: ${product.price}
              </p>
              <hr className="my-3 h-0.5 bg-red-950" />

              <div className="mt-2">
                <span className="font-bold text-slate-700"> Status: </span>
                <span className="text-slate-500">
                  {product.countInStock > 0 ? " Available 🟢" : " Out of Stock"}
                </span>
              </div>
              {product.countInStock > 0 && (
                <div className="mt-4">
                  <label
                    htmlFor="quantity"
                    className="font-bold mb-2 text-slate-700"
                  >
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border ml-3 w-24 p-2 rounded-md text-slate-500"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <hr className="my-3 h-0.5 bg-red-950" />

              {quantity > 0 && (
                <p className="mt-4 text-lg text-center font-bold text-red-700">
                  Total: ${(quantity * product.price).toFixed(2)}
                </p>
              )}
              <hr className="my-3 h-0.5 bg-red-950" />
              <div id="submit-btn" className="flex justify-center">
                <button
                  className="btn mt-4 p-2 px-4 rounded-md text-white bg-blue-800"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <Reviews />
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
