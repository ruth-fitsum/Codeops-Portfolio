import Link from "next/link";
import CartCount from "@/components/CartCount";
export default function Header(){return <header className="site-header"><Link className="brand" href="/">Addis Eats</Link><nav className="nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/menu">Menu</Link><Link href="/cart"><CartCount/></Link><Link href="/checkout">Checkout</Link></nav></header>}
