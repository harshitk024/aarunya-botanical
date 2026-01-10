import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import imageCompression from "browser-image-compression"
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = () => {
  const [prodImages, setProdImages] = useState([]);
  const [name, SetName] = useState("");
  const [price, SetPrice] = useState("");
  const [description, SetDescription] = useState("");
  const [type, SetType] = useState("");
  const [stock, setStock] = useState(0);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (prodImages.length == 0) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();

      prodImages.forEach((img) => {
        formData.append("images",img)
      })

      formData.append("name", name);
      formData.append("price", Number(price));
      formData.append("description", description);
      formData.append("type", type);
      formData.append("stock",stock)

      for(let [key,value] of formData.entries()){
        console.log(key,value)
      }

      const { data } = await axios.post(backendUrl + "/api/products", formData, {
        headers: { Authorization: `Bearer ${aToken}`, "Content-Type": "multipart/form-data" },
      });

      if (data) {
        toast.success("Product Added");
        setProdImages([]);
        SetName("");
        SetPrice("");
        SetDescription("");
        SetType("")
        setStock(0)
      } else {
        toast.error("Failed to Add product");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Product</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <div className="flex gap-3 flex-wrap">
            {/* Preview images */}
            {prodImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  className="w-16 h-16 bg-gray-100 object-cover"
                  src={URL.createObjectURL(img)}
                  alt=""
                />

                {/* Remove image */}
                <button
                  onClick={() =>
                    setProdImages(prodImages.filter((_, i) => i !== index))
                  }
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Plus icon */}
            <label
              htmlFor="doc-img"
              className="w-16 h-16 flex items-center justify-center bg-gray-100 cursor-pointer border border-dashed"
            >
              <span className="text-2xl text-gray-400">+</span>
            </label>

            <input
              onChange={(e) =>
                setProdImages((prev) => [
                  ...prev,
                  ...Array.from(e.target.files),
                ])
              }
              type="file"
              id="doc-img"
              hidden
              multiple
              accept="image/*"
            />
          </div>

          <p>
            Upload Product <br /> pictures
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Product Name</p>
              <input
                onChange={(e) => SetName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>


            <div className="flex-1 flex flex-col gap-1">
              <p>Price (in Rupees)</p>
              <input
                onChange={(e) => SetPrice(e.target.value)}
                value={price}
                min={0}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="price"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Stock</p>
              <input
                onChange={(e) => setStock(e.target.value)}
                min={0}
                value={stock}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="price"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Type</p>
              <select
                onChange={(e) => SetType(e.target.value)}
                value={type}
                className="border rounded px-3 py-2"
                name=""
                id="b"
              >
                <option value="Hair Care">Hair Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Health">Health</option>
 
              </select>
            </div>


          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">Description Product</p>
          <textarea
            onChange={(e) => SetDescription(e.target.value)}
            value={description}
            className="w-full px-4 pt-2 border rounded"
            placeholder="write description Product"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
