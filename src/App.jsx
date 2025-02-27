import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Login from "./components/Login";
import Admin from "./components/Admin";
import ImageBanner from "./components/ImageBanner";
import Product from "./components/Product";
import Category from "./components/Category";
import Producthome from "./components/Products";  
import Contact from "./components/Contact";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/admin", "/imagebanner", "/product", "/category"];
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setShowIntro(true); // Reset intro on every route change
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Run every time the route changes

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {showIntro ? (
        <Introduction />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/imagebanner" element={<ImageBanner />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Producthome />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
    </>
  );
};

export default App;
