import { CartProvider } from "./CartContext";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Checkout from "./components/Checkout";

function AppContent() {
  return (
    <>
      <Header />

      <div className="layout">
        <Menu />
        <Checkout />
      </div>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <AppContent />
      </div>
    </CartProvider>
  );
}