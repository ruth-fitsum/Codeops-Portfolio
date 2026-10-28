"use client";
import {useCart} from "@/components/Providers";
export default function CartCount(){const {count}=useCart();return <span>Cart ({count})</span>}
