import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import DesktopNavbar from "./components/DesktopNavbar";
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
      setShowIntro(true); 
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowIntro(false);
    }
  }, [location.pathname]); 

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

  // Determine if we should show the navbar
  const showNavbar = !hideNavbarPaths.includes(location.pathname);
  
  return (
    <div className="flex min-h-screen bg-white">
      {showNavbar && (
        <>
          <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white">
            <Navbar />
          </div>
          
          <div className="hidden md:block fixed top-0 left-0 w-[15%] h-full bg-white">
            <DesktopNavbar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className={`flex-1 w-full ${showNavbar ? 'md:ml-[15%] pt-16 md:pt-0' : ''} overflow-x-hidden`}>
        {showIntro ? (
          <Introduction />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
            <Route path="/imagebanner" element={<ProtectedRoute element={<ImageBanner />} />} />
            <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
            <Route path="/category" element={<ProtectedRoute element={<Category />} />} />
            <Route path="/products" element={<Producthome />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;