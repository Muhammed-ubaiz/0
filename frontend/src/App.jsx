import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import StoreLayout from './components/layout/StoreLayout';
import About from './pages/About';
import Cart from './pages/Cart';
import CategoriesPage from './pages/Categories';
import CategoryPage from './pages/Category';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Keeps links from the current Shopify-style URLs working.
function LegacyProduct() {
  const { handle } = useParams();
  return <Navigate to={`/product/${handle}`} replace />;
}

function LegacyCollection() {
  const { handle } = useParams();
  return <Navigate to={handle === 'all' ? '/shop' : `/category/${handle}`} replace />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<StoreLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="category/:handle" element={<CategoryPage />} />
                <Route path="product/:handle" element={<ProductDetails />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />

                <Route path="products" element={<Navigate to="/shop" replace />} />
                <Route path="products/:handle" element={<LegacyProduct />} />
                <Route path="collections/:handle" element={<LegacyCollection />} />
                <Route path="about-us" element={<Navigate to="/about" replace />} />
                <Route path="contact-us" element={<Navigate to="/contact" replace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route
                path="admin"
                element={
                  <Suspense fallback={<div className="min-h-screen bg-mist" />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </MotionConfig>
  );
}
