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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

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
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowIntro(true); // Show intro only on the Home page
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowIntro(false); // Hide intro on other pages
    }
  }, [location.pathname]); // Run every time the route changes
  const [loader, setLoader] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const timer = setTimeout(() => {
      setLoader(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const ProtectedRoute = ({ element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return element;
  };
  

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {showIntro ? (
        <Introduction />
      ) : (
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin/>} />}/>
          <Route path="/imagebanner" element={<ProtectedRoute element={<ImageBanner />} />}/>
          <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
          <Route path="/category"  element={<ProtectedRoute element={<Category />} />}  />
          <Route path="/products" element={<Producthome />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
    </>
  );
};

export default App;
