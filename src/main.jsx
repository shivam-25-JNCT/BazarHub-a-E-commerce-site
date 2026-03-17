import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { DataProvider } from "./context/DataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import {ToastContainer} from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'

const PUBLICSHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLICSHABLE_KEY) {
  throw new Error("missing publishable key");
}
createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <DataProvider>
    <CartProvider>
      <ClerkProvider publishableKey={PUBLICSHABLE_KEY} afterSignOutUrl={"/"}>
        <App />
         <ScrollToTop color="white" smooth style={{backgroundColor:"#fa2d37", display:"flex", alignItems:"center" , justifyContent:"center" }}/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          
        />
      </ClerkProvider>
    </CartProvider>
  </DataProvider>,

  // {/* </StrictMode> */}
);
