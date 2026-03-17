import React from "react";
import { useCart } from "../context/CartContext";
import { LucideNotebookText, Trash2, Bike, ShoppingBag } from "lucide-react";
import { useUser } from "@clerk/react";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

function Cart({ getLocation, loact }) {
  const { cartItem, removeFromCart, totalPrice, updateQty } = useCart();
  //get user detail
  const { user } = useUser();
  let navigate = useNavigate();

  return (
    <div className="mt-10 max-w-6xl mb-5 mx-auto px-4 md-px-0 ">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>
          <div>
            <div className="mt-10 ">
              {cartItem.map((item, index) => {
                const originalprice = Math.round(
                  item.price + (item.price * item.discountPercentage) / 100,
                );

                return (
                  <div
                    key={index}
                    className="bg-gray-100  shadow-2xl p-5 rounded-md md:flex items-center justify-between mt-3 "
                  >
                    <div className="flex items-center gap-4 ">
                      <img
                        src={item.images}
                        alt={item.title}
                        className="w-20 h-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-[300px] md:line-clamp-2  ">
                          {item.title}
                        </h1>
                        <h1>{item.category} </h1>
                        <p className="text-red-500 ">
                          <span className="text-white bg-red-600 p-0.5 rounded text-sm mr-1">
                            -{item.discountPercentage}%
                          </span>{" "}
                          <span className="font-bold text-lg mr-1">
                            ${item.price}{" "}
                          </span>
                          <span className=" text-gray-700 text-sm ">
                            M. R. P.:{" "}
                            <span className="line-through ml-1 ">
                              {" "}
                              ${originalprice}
                            </span>
                          </span>
                        </p>
                        <p className="text-sm text-green-700">
                          {item.stock <= 0 ? "out of stock" : "in stock"}
                        </p>
                        <p className="text-sm text-blue-500">
                          {item.returnPolicy}
                        </p>
                      </div>
                    </div>
                    <div className="flex border border-gray-500   rounded-md  items-center   divide-x divide-gray-300 w-36 text-center">
                      <button
                        onClick={() => updateQty(item.id, "decrease")}
                        className="flex-1 py-1 hover:bg-gray-200 rounded-l-md "
                      >
                        {item.qty === 1 ? <Trash2 size={23} /> : "-"}
                      </button>

                      <p className="flex-1 py-1 font-semibold">{item.qty}</p>

                      <button
                        onClick={() => updateQty(item.id, "increase")}
                        className="flex-1 py-1 hover:bg-gray-200 rounded-r-md "
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                      }}
                      className=" text-red-600 p-3 hover:bg-white hover:rounded-full"
                    >
                      <Trash2 size={30} className="" />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-20 ">
              <form className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 text-xl font-bold">
                  Delevery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name</label>
                  <input
                    value={user?.fullName}
                    type="text"
                    placeholder="Enter your Name"
                    className="p-2 rounded"
                  />
                </div>

                <div className="flex flex-col space-y-1 ">
                  <label htmlFor="">Address</label>
                  <input
                    value={`${loact.residential} , ${loact.county} `}
                    type="text"
                    placeholder="Enter your address"
                    className="p-2 rounded"
                  />
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State</label>
                    <input
                      value={loact.state}
                      type="text"
                      placeholder="Enter your state"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">PostCode</label>
                    <input
                      value={loact.postcode}
                      type="text"
                      placeholder="Enter your postCode"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country</label>
                    <input
                      value={loact.country}
                      type="text"
                      placeholder="Enter your Country"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone no</label>
                    <input
                      type="text"
                      placeholder="Enter your number"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-2 cursor-pointer">
                  Submit
                </button>

                <div className="flex items-center justify-center w-full  text-gray-700 mt-3">
                  ----------OR----------
                </div>
                <div className=" flex justify-center ">
                  <button
                    onClick={getLocation}
                    className="bg-red-500 text-white px-3 py-2 rounded-md "
                  >
                    Detect Location
                  </button>{" "}
                </div>
              </form>

              <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max ">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill Details
                </h1>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 text-gray-600">
                    <span>
                      <LucideNotebookText />
                    </span>
                    Items total:
                  </h1>
                  <p> $ {totalPrice} </p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 text-gray-600">
                    <span>
                      <Bike />
                    </span>
                    Delivery
                  </h1>
                  <p className="text-red-600">
                    {" "}
                    <span className="text-gray-600 line-through">
                      $20{" "}
                    </span>{" "}
                    FREE
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 text-gray-600">
                    <span>
                      <ShoppingBag />
                    </span>
                    Handling charge
                  </h1>
                  <p className="text-red-600"> $5 </p>
                </div>
                <hr className="text-gray-300 mt-2" />
                <div className=" flex justify-between items-center">
                  <h1 className="font-bold text-lg flex">Grand Total:</h1>
                  <p className="font-semibold text-lg">${totalPrice + 5}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-700 mb-3 mt-7 ">
                    Apply Promo Code
                  </h1>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter Code"
                      className="p-2 rounded-md w-full"
                    />
                    <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                      Apply
                    </button>
                  </div>
                </div>

                <button className="bg-red-500 text-white px-3 py-2 w-full rounded-md cursor-pointer mt-3">
                  Proceed to Cheakout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px] ">
          <h1 className="text-red-500/80 font-bold text-5xl text-muted">
            Oh no! Your cart is Empty
          </h1>
          <img src={emptyCart} alt="Cart is Empty" className="w-[400px]" />
          <button
            onClick={() => navigate("/product")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Coninue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
