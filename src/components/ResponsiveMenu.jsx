import { UserButton, useUser } from "@clerk/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

function ResponsiveMenu({ openNav, setOpenNav }) {
  const { user } = useUser();


  return (
    <div
      className={`${openNav ? "left-0" : "-left-[100%]"}  fixed bottom-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 py-6 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        <div className="flex flex-col items-center justify-start gap-1 ">
          <h2 className="text-sm">{user?.primaryEmailAddress?.emailAddress}</h2>
          {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}
          <h1 className="text-sm"> Hi, {user?.firstName}</h1>
        </div>
        <nav className="mt-12 ">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link
              to={"/"}
              className=" text-black cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Home</li>
            </Link>

            <Link to={"product"} className=" text-black cursor-pointer" onClick={() => setOpenNav(false)}>
              <li>Product</li>
            </Link>
            <Link
              to={"about"}
              className=" text-black cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>About</li>
            </Link>
            <Link
              to={"contect"}
              className=" text-black cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              {" "}
              <li>Contect</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ResponsiveMenu;
