import { useState } from "react";
import { Logo } from "../assets/images";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiHelper } from "../utils/utils";

function AddProducts() {
  const navigate = useNavigate();
  const [productsDetails, setProducts] = useState({
    name: "",
    family: "",
    color: "",
    image: null,
    origin: "",
    quantity: "",
    price: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productsDetails.image) {
      toast.error("Image Required");
      return;
    }

    try {
      const form = new FormData();
      Object.entries(productsDetails).forEach(([key, value]) => {
        form.append(key, value);
      });

      await apiHelper.post("/api/products/add", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Product added successfully!");
      navigate("/agroproducts");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProducts((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value
    }));
  };

  return (
    <div className="flex flex-col px-5 md:px-10 lg:px-20 py-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold">Add New Product</p>
        <button
          className="bg-green-600 text-white font-semibold hover:bg-green-700 px-4 py-2 rounded-md"
          onClick={() => navigate("/agroproducts")}
        >
          Agro Products
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-5">
        {/* Input Fields */}
        <div className="flex flex-col w-full lg:w-[72%] gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label>Product Name</label>
              <input
                value={productsDetails.name}
                onChange={handleChange}
                name="name"
                className="input"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Product Color</label>
              <input
                type="text"
                name="color"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label>Product Family</label>
              <input
                type="text"
                name="family"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Product Origin</label>
              <input
                type="text"
                name="origin"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label>Product Quantity</label>
              <input
                type="number"
                name="quantity"
                className="input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Product Price Per Kg</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label>Product Description</label>
            <textarea
              className="w-full input"
              name="description"
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
        </div>

        {/* Image Upload & Submit */}
        <div className="flex flex-col w-full lg:w-[28%] gap-5 items-center">
          <label
            htmlFor="image"
            className="w-full text-center border border-green-600 rounded-md py-3 cursor-pointer"
          >
            Upload Product Image
          </label>
          <label htmlFor="image" className="img">
            <img
              src={productsDetails.image ? URL.createObjectURL(productsDetails.image) : Logo}
              className="border border-green-600 rounded-md w-full"
              alt="Product Preview"
            />
          </label>
          <input type="file" onChange={handleChange} name="image" id="image" hidden />

          <button
            className="py-3 w-full text-white font-semibold rounded-md bg-green-600 hover:bg-green-700"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
