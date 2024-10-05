import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="h-44 mx-auto" alt="product-img" />
      </Link>

      <div className="mt-3 ">
        <Link to={`/product/${product._id}`}>
          <h4 className="text-gray-700">
            <strong>{product.name}</strong>
          </h4>
        </Link>
        <hr className=" bg-yellow-900 h-0.5 my-1" />
        <div className="">
          <Rating
            rating={product.rating}
            numReviews={`${product.numReviews} reviews`}
          />
        </div>
        <hr className=" bg-yellow-900 h-0.5 my-1" />
        <h4 className="text-yellow-950 font-sem">$ {product.price}</h4>
      </div>
    </>
  );
};
export default Product;
