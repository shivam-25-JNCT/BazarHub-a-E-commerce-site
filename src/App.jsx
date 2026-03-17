import React, { useEffect, useState } from "react";
import axios from "axios";
import { Await, BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contect from "./pages/Contect";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import Category from "./components/Category";
import CategoryProduct from "./pages/CategoryProduct";
import { useCart } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loact, setloac] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const { cartItem, setCartItem } = useCart();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const response = await axios(url);

        const exacatLocation = response.data.address;

        setloac(exacatLocation);
        setOpenDropdown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);

  //load cart from local storage on initial redenr
  useEffect(() => {
    const storagedCart = localStorage.getItem("cartItem");
    if (storagedCart) {
      setCartItem(JSON.parse(storagedCart));
    }
  }, []);

  //save to cart  on local storage
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <BrowserRouter>
      <Navbar
        loact={loact}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/category/:category" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contect" element={<Contect />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart loact={loact} getLocation={getLocation} />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
