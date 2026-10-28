"use client";
import {useCart} from "@/components/Providers";
export default function AddToCartButton({dish}) {
  const {addItem} = useCart();
  return <button className="button" onClick={()=>addItem(dish)}>Add to cart</button>;
}
