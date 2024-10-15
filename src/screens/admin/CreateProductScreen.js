import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slice_store/productApiSlice";
const CreateProductScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const [uploadProductImage, { isLoading: loadingImageUpdate }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hello");
    const newProduct = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await createProduct(newProduct);
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
        {loadingCreateProduct && <Loader />}
        <div className="flex justify-center text-lg text-slate-600">
          <form onSubmit={submitHandler}>
            <div className="my-2" id="name">
              <label className="block">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              />
            </div>
            <div className="my-2" id="price">
              <label className="block">Price</label>
              <input
                type="number"
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
                onChange={(e) => setImage}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              ></input>
              <input
                type="file"
                label="choose file"
                onChange={uploadFileHandler}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              />
              {loadingImageUpdate && <Loader />}
            </div>

            <div className="my-2" id="brand">
              <label className="block">Brand</label>
              <input
                type="text"
                onChange={(e) => setBrand(e.target.value)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              />
            </div>
            <div className="my-2" id="countInStock">
              <label className="block">Count In Stock</label>
              <input
                type="text"
                placeholder="Enter a quantity"
                onChange={(e) => setCountInStock(e.target.value)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              ></input>
            </div>
            <div className="my-2" id="category">
              <label className="block">Category</label>
              <input
                type="text"
                placeholder="Enter a category"
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              ></input>
            </div>
            <div className="my-2" id="description">
              <label className="block">Description</label>
              <input
                rows={3}
                placeholder="Enter a description"
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none text-sm border border-slate-300 focus:border-slate-700 text-slate-500 w-full rounded-md p-2"
              ></input>
            </div>
            <button
              type="submit"
              className="p-2 bg-slate-700 text-white text-sm px-3 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateProductScreen;
