import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const Rating = ({ rating, numReviews }) => {
  return (
    <div className="flex justify-between">
      <div id="stars" className="flex text-yellow-400">
        <span>
          {rating >= 1 ? (
            <FaStar />
          ) : rating >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 2 ? (
            <FaStar />
          ) : rating >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 3 ? (
            <FaStar />
          ) : rating >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 4 ? (
            <FaStar />
          ) : rating >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 5 ? (
            <FaStar />
          ) : rating >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      </div>
      <div className="text-yellow-950 font-semibold">
        {numReviews && numReviews}
      </div>
    </div>
  );
};
export default Rating;
