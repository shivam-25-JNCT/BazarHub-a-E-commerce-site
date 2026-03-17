import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3,HiMenuAlt1 } from "react-icons/hi";


import {
  MapPin,
  ChevronDown,
  ShoppingCart,
  X,
  Menu,
  Minus,
} from "lucide-react";
import Cart from "../pages/Cart";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { useCart } from "../context/CartContext";
import ResponsiveMenu from "./ResponsiveMenu";

function Navbar({ loact, getLocation, openDropdown, setOpenDropdown }) {
  const { totalItem } = useCart();
  const [openNav, setOpenNav] = useState(false);

  const toggledropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const toggleMinu = () => {
    setOpenNav(!openNav);
  };

  const getCurrentLocatiom = () => {};

  return (
    <div className="bg-white py-3 shadow-2xl  px-4 md: px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo section */}

        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            {" "}
            <h1 className="font-bold text-3xl">
              <span className="text-red-500">B</span>azarHub
            </h1>
          </Link>
          <div className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {" "}
              {loact ? (
                <div className="-space-y-2">
                  <p>{loact.residential} </p>
                  <p> {loact.city}</p>
                  <p> {loact.state}</p>
                </div>
              ) : (
                "Add Addres"
              )}
            </span>
            <ChevronDown onClick={toggledropdown} />
          </div>

          {openDropdown ? (
            <div className="w-[205px] bg-white fixed top-16 left-80 borde-2 p-5 border-gray-100 rounded-md h-max shadow-2xl z-50">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span>
                  <X onClick={toggledropdown} />
                </span>
              </h1>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md active:scale-95 cursor-pointer hover:bg-red-400"
                onClick={getLocation}
              >
                Get My Location
              </button>
            </div>
          ) : null}
        </div>

        {/* {minu seaction} */}

        <nav className="flex items-center gap-7">
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>

            <NavLink
              to={"product"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              <li>Product</li>
            </NavLink>
            <NavLink
              to={"about"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"contect"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              {" "}
              <li>Contect</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart className="h-7 w-7 " />
            <span className="bg-red-500 px-2 rounded-full absolute text-white -top-3 -right-3">
              {totalItem}
            </span>
          </Link>

          <div className="hidden md:block">
            <Show when="signed-out">
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer active:-" />
            </Show>
            <Show when="signed-in">
              <UserButton className="text-xl" />
            </Show>
          </div>
          {openNav ? (
            <HiMenuAlt3 onClick={toggleMinu} className="md:hidden w-7 h-7" />
          ) : (
            <HiMenuAlt1 onClick={toggleMinu} className="md:hidden w-7 h-7" />
          )}
        </nav>
      </div>
      <ResponsiveMenu  openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  );
}

export default Navbar;
