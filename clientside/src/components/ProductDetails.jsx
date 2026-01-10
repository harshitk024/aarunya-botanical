import { addToCart } from "../lib/features/cart/cartSlice";
import {
  StarIcon,
  TagIcon,
  EarthIcon,
  CreditCardIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {
  const productId = product.id;
  const currency = "₹";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, loading } = useSelector((state) => state.cart);

  console.log(cartItems);

  const cartItem = cartItems.find((item) => item.productId === productId);

  const [mainImage, setMainImage] = useState(product.images[0].imageUrl);

  const addToCartHandler = () => {
    dispatch(addToCart({ productId }));
  };

  const averageRating = 5;

  return (
    <div className="flex max-lg:flex-col gap-12">
      <div className="flex max-sm:flex-col-reverse gap-3">
        <div className="flex sm:flex-col gap-3">
          {product.images.map((image, index) => (
            <div
              key={index}
              onClick={() => setMainImage(product.images[index].imageUrl)}
              className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer"
            >
              <img
                src={image.imageUrl}
                className="group-hover:scale-103 group-active:scale-95 transition"
                alt=""
                width={45}
                height={45}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center h-60 w-60 sm:size-113 bg-slate-100 rounded-lg ">
          <img src={mainImage} alt="" className="object-fit w-full h-full" />
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-slate-800">
          {product.name}
        </h1>

        <div className="flex items-center mt-2">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="text-transparent mt-0.5"
                fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"}
              />
            ))}
          <p className="text-sm ml-3 text-slate-500">10 Reviews</p>
        </div>

        <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
          <p>
            {currency}
            {product.price}
          </p>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <TagIcon size={14} />
          <p>Save 5% right now</p>
        </div>

        <div className="flex items-end gap-5 mt-10">
          {cartItem && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-slate-800 font-semibold">Quantity</p>
              <Counter productId={productId} />
            </div>
          )}

          <button
            disabled={loading}
            onClick={() => (cartItem ? navigate("/cart") : addToCartHandler())}
            className={`bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded transition
              ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-slate-900 active:scale-95"
              }
            `}
          >
            {loading ? "Loading..." : cartItem ? "View Cart" : "Add to Cart"}
          </button>
        </div>

        <hr className="border-gray-300 my-5" />

        <div className="flex flex-col gap-4 text-slate-500">
          <p className="flex gap-3">
            <EarthIcon className="text-slate-400" />
            Free shipping worldwide
          </p>
          <p className="flex gap-3">
            <CreditCardIcon className="text-slate-400" />
            100% Secured Payment
          </p>
          <p className="flex gap-3">
            <UserIcon className="text-slate-400" />
            Trusted by top brands
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
