import ProductDetails from "../components/ProductDetails";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const {products} = useContext(AppContext)


    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);

    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        scrollTo(0, 0)
    }, [productId,products]);
    console.log(product)

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrums */}
                <div className="  text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.type}
                </div>

                {/* Product Details */}
                {product && (<ProductDetails product={product} />)}

                {/* Description & Reviews */}
                {/* {product && (<ProductDescription product={product} />)} */}
            </div>
        </div>
    );
}