import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slice_store/productApiSlice";
import Loader from "../components/Loader";
import Message from "./Message";
import Rating from "./Rating";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";
const Reviews = () => {
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const { data: product, refetch } = useGetProductDetailsQuery(productId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        _id: productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review added successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div
      id="reviews-section"
      className="mt-10 border border-orange-800 shadow-lg rounded-md shadow-orange-100 p-4"
    >
      <h2 className=" font-bold text-3xl text-emerald-900  text-center">
        Customer Reviews
      </h2>
      <hr className="my-3 h-1 bg-red-950" />
      {/* Write Review */}
      <div className=" flex justify-between pr-6">
        <div className=" w-1/3 p-3 h-96 ">
          <h2 className="text-2xl font-bold text-teal-950">
            Review this product
          </h2>
          {loadingProductReview && <Loader />}
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className="mt-6 flex justify-between pr-10">
                <label
                  htmlFor="rating"
                  className=" mb-2  text-xl font-semibold text-teal-900"
                >
                  Rating
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="border p-1 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="comment"
                  className="block mb-2  text-emerald-950 text-xl"
                >
                  Write a Review:
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border p-2 rounded-md"
                ></textarea>
              </div>

              <div id="review-btn" className="flex justify-center">
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="btn mt-4 p-2 text-white bg-blue-900 rounded-md px-3"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <Message>
              Please <Link to="/login">sign in</Link> to write a review
            </Message>
          )}
        </div>
        <div id="reviews" className="w-2/3 pl-10 border-l-2 border-orange-800">
          {product.reviews.length === 0 ? (
            <Message>No Reviews</Message>
          ) : (
            <div>
              {product.reviews.map((review) => (
                <div key={review._id} className="border-b py-4">
                  <div id="reviews-info" className="flex justify-between">
                    <strong>{review.name}</strong>
                    <p className="text-sm">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <div id="rate-comment" className="flex justify-between">
                    <p>{review.comment}</p>
                    <Rating rating={review.rating} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
