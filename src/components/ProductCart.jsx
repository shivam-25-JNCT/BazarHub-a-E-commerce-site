import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
function ProductCart({ prod }) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max shadow-xl ">
      <img
        src={prod.images}
        alt=""
        className="bg-gray-100 aspect-square "
        onClick={() => navigate(`/product/${prod.id}`)}
      />
      <h1 className="line-clamp-2 p-1 font-semibold">{prod.title}</h1>
      <p className="my-1 text-lg text-gray-800 font-semibold">${prod.price}</p>
      <button
        onClick={() => {
          addToCart(prod);
        }}
        className="bg-red-500 px-3 py-2 text-red-500 text-lg cursor-pointer flex gap-2 items-center justify-center font-semibold text-white rounded-md w-full"
      >
        {" "}
        <IoCartOutline className="w-6 h-6" />
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCart;
