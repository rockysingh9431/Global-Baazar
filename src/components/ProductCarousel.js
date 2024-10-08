import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductQuery } from "../slice_store/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();
  return isLoading ? (
    <></>
  ) : error ? (
    <Message variant="danger"></Message>
  ) : (
    <Carousel
      pause="hover"
      className="'bg-primary mx-auto"
      style={{
        width: "800px",
        height: "auto",
      }}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ width: "800px", maxHeight: "500px" }}
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default ProductCarousel;
