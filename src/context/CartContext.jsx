import { Children, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const exist = cartItem.find((item) => item.id === product.id);

    if (exist) {
      setCartItem((pre) =>
        pre.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
       toast.success("Product quantity increased")
    } else {
      setCartItem([...cartItem, { ...product, qty: 1 }]);
      toast.success("Product is added to Cart")
    }
  };
  const removeFromCart = (id) => {
    setCartItem((pre) => pre.filter((item) => item.id !== id));
    toast.success("Product is deleted from cart!")
  };
  // const increseQty=(id)=>{
  //     setCartItem(pre=>pre.map(item=> item.id===id ? {...item, qty:item.qty+1} : item))
  // }
  // const decreseQty=(id)=>{

  //  setCartItem(pre=>{
  //     const updatecart=pre.map(item=> item.id===id ? {...item, qty:item.qty-1} : item)

  //      return updatecart.filter(item=>item.qty>0)
  //  })

  // }

  const updateQty = (prodId, action) => {
    setCartItem((pre) =>
      pre
        .map((item) => {
          if (item.id === prodId) {
            let newQty = item.qty;
            if (action === "increase") {
              newQty = newQty + 1;
               toast.success("Quantity is increased")
            } else if (action === "decrease") {
              newQty = newQty - 1;
                             toast.success("Quantity is decreased")

            }
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter((item) => item !== null),
    );
  };

  const totalPrice = cartItem.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);

  const totalItem = cartItem.reduce((total, item) => {
    return total + item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        updateQty,
        totalPrice,
        totalItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
