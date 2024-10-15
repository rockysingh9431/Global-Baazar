import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slice_store/productApiSlice";
const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdateProduct }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingImageUpdate }] =
    useUploadProductImageMutation();
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hello");
    const updatedProduct = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    console.log(result.error, result);
    if (result.error) {
      toast.error("something went wrong");
    } else {
      toast.success("Product Updated Successfully");
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="pt-24 px-24">
      <div className="">
        <h1 className="text-center text-teal-900 font-bold text-4xl">
          Edit Product
        </h1>
        {loadingUpdateProduct && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error.data.message || error.error}
          </Message>
        ) : (
          <div className="flex justify-center text-lg text-slate-600">
            <form onSubmit={submitHandler}>
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
              <div className="my-2" id="price">
                <label className="block">Price</label>
                <input
                  type="number"
                  value={price}
                  placeholder="Enter your price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
                />
              </div>
              <div id="image" className="my-2">
                <label className="block">Image</label>
                <input
                  type="text"
                  placeholder="upload Image"
                  value={image}
                  onChange={(e) => setImage}
                  className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
                ></input>
                <input
                  type="file"
                  label="choose file"
                  onChange={uploadFileHandler}
                  className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
                ></input>
                {loadingImageUpdate && <Loader />}
              </div>

              <div className="my-2" id="brand">
                <label className="block">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
                />
              </div>
              <div className="my-2" id="countInStock">
                <label className="block">Count In Stock</label>
                <input
                  type="text"
                  placeholder="Enter a quantity"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
                ></input>
              </div>
              <div className="my-2" id="category">
                <label className="block">Category</label>
                <input
                  type="text"
                  value={category}
                  placeholder="Enter a category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
                ></input>
              </div>
              <div className="my-2" id="description">
                <label className="block">Description</label>
                <input
                  rows={3}
                  value={description}
                  placeholder="Enter a description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
                ></input>
              </div>
              <button
                type="submit"
                className="p-2 bg-slate-700 text-white text-sm px-3 rounded-md"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductEditScreen;
