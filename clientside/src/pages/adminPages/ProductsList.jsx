import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const ProductsList = () => {
  const { products,getAllProducts } = useContext(AdminContext);

  useEffect(() => {
    getAllProducts()
  },[])

  if(products) <div>Loading..</div>


  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Products</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {products.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
              src={item.images[0].imageUrl}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>

              <p className="text-zinc-600 text-sm">Type: {item.type}</p>
              <p className="text-zinc-600 text-sm">Stock: {item.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
