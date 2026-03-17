import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/src_assets_Loading4.webm";
import Breadcrum from '../components/Breadcrum'
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
function SingleProduct() {
  const params = useParams(); //for get if from url
  const [singleProd, setSingleProd] = useState("");
  const {addToCart}=useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios(`https://dummyjson.com/products/${params.id}`);

      const product = res.data;
      setSingleProd(product);
      console.log(product);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
const originalprice =Math.round(singleProd.price + (singleProd.price * singleProd.discountPercentage / 100));
  return (
    <>
      {singleProd ? (
        <div className="px-4 pb-4 md:px-0">
      <Breadcrum title={singleProd.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid md:grid-cols-2 grid-cols-1 gap-10">
        {/* prod image */}
        <div className="w-full ">
            <img src={singleProd.images} alt={singleProd.title} className="rounded-xl w-full object-cover" />
        </div>
        {/* prod detai */}
        <div className="flex flex-col gap-6">
            <h1 className="md:text-3xl text-xl font-bold text-gray-800">{singleProd.title}</h1>
            <div className="text-gray-700 uppercase ">{singleProd.brand} / {singleProd.category}/ {singleProd?.model}</div>
            <p className="text-xl text-rose-500 font-bold">${singleProd.price} <span className="ml-2 text-gray-700 text-lg line-through">${originalprice}</span>   <span className="bg-red-500 text-white p-2 rounded ml-2">{singleProd.discountPercentage} % discount</span></p>

            <p className="text-gray-600">{singleProd.description}</p>
             {/* quantity */}
             <div className="flex items-center gap-4 ">
                <label htmlFor="" className="text-sm font-medium text-gray-700">Quantity : </label>
                <input type="number" min={1} value={1}className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500" />
             </div>
             <div className="flex gap-4 ,t-4 ">
                <button className="px-6 flex gap-2 py-2 items-center bg-red-500 text-white rounded-md"
                onClick={()=>{addToCart(singleProd)}}
                > <IoCartOutline className="w-6 h-6"/>    Add to Cart</button>
             </div>
        </div>
      </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type=" video/webm" />
          </video>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
