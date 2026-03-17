import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProduectView({ prod, index }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  return (
    <div className="space-y-4 mt-4 rounded-md ">
      <div
        className="bg-gray-100 flex gap-7
    items-center rounded-md shadow-xl"
      >
        <img
          src={prod.images}
          alt={prod.title}
          className="md:w-60 md:h-60 w-25 h-25  roundedms
        cursor-pointer"
          onClick={() => navigate(`/product/${prod.id}`)}
        />
        <div className="md:space-y-2 ">
          <h1 className="font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[220px]">
            {prod.title}
          </h1>
          <p className="font-semibold flex items-center md:text-lg text-sm">$
            <span className="md:text-3xl text-xl">{prod.price}</span>(
            {prod.discountPercentage})%{" "}
          </p>
          <p className="text-sm">
            FREE delivery <b>Fri, 18</b> <br />
            Or fastest delivery <b>Tommorow , 17 Apr</b>
          </p>
          <button
            className="bg-red-500 px-3 py-2 rounded-md cursor-pointer text-white p"
            onClick={() => addToCart(prod)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProduectView;
