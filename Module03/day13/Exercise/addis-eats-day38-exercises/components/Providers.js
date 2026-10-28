"use client";
import { createContext, useContext, useMemo, useState } from "react";
const CartContext = createContext(null);
export function Providers({children}) {
  const [items, setItems] = useState([]);
  const addItem = (dish) => setItems((current) => {
    const found = current.find((item) => item.id === dish.id);
    return found
      ? current.map((item) => item.id === dish.id ? {...item, quantity:item.quantity+1} : item)
      : [...current, {...dish, quantity:1}];
  });
  const removeItem = (id) => setItems((current) => current.filter((item)=>item.id!==id));
  const value = useMemo(()=>({items,addItem,removeItem,count:items.reduce((sum,item)=>sum+item.quantity,0)}),[items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(){const value=useContext(CartContext);if(!value)throw new Error("useCart must be used inside Providers");return value;}
