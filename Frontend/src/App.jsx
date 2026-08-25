import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collection";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import ScrollToTop from "./components/ScrollToTop";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/collections" element={<Collections />} />

        <Route path="/about" element={<About />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/search" element={<Search />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/contact" element={<Contact />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register/>} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;