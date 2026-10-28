import "./globals.css";import Header from "@/components/Header";import Footer from "@/components/Footer";import {Providers} from "@/components/Providers";
export const metadata={title:{default:"Addis Eats",template:"%s | Addis Eats"},description:"Explore Ethiopian favorites with Addis Eats."};
export default function RootLayout({children}){return <html lang="en"><body><Providers><Header/>{children}<Footer/></Providers></body></html>}
