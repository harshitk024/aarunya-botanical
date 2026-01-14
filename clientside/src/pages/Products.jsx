import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Products = () => {
  const { type } = useParams();
  const [filterProd, setFilterProd] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const {products} = useContext(AppContext)

  const navigate = useNavigate()
  const handleClick = (id) => {
        console.log("clicked")
        navigate(`/product/${id}`)
   }



  const applyFilter = () => {
    if (type) {
      setFilterProd(products.filter((prod) => prod.type === type));
    } else {
      setFilterProd(products);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [products, type]);

  return (
    <div>
      <p className="text-gray-600">Browse through different Health Products.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >


          <p
            onClick={() =>
              type === "HEALTH"
                ? navigate("/products")
                : navigate("/products/HEALTH")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              type === "HEALTH" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Health
          </p>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filterProd
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onClick={() => {
                  handleClick(product.id);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
