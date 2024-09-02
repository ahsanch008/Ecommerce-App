import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import AdminProductManagement from './pages/AdminProductManagement';
import UserManagement from './pages/UserManagement';
import OrderManagement from './pages/OrderManagement';
import ReviewManagement from './pages/ReviewManagement';
import AddProduct from './pages/Add';
import PrivateRoute from './pages/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap the application with CartProvider */}
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
              <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/order-history" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
              <Route path="/orders/:id" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
              <Route path="/admin/products" element={<PrivateRoute><AdminProductManagement /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
              <Route path="/admin/orders" element={<PrivateRoute><OrderManagement /></PrivateRoute>} />
              <Route path="/admin/reviews" element={<PrivateRoute><ReviewManagement /></PrivateRoute>} />
            </Routes>
          </MainLayout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;