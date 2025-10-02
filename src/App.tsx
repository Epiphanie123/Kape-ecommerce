import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import KapeePage from "./components/Page";
import Deals from "./pages/Deals";
import Support from "./pages/Support";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Element from "./components/Element";

import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import AdminLayout from "./pages/admin/AdminLayout";
import Orders from "./pages/admin/orders";
import Setting from "./pages/admin/Setting";
import Report from "./pages/admin/Report";
import Messages from "./pages/admin/Messages";
import Checkout from "./pages/payment";
import PasswordReset from "./pages/passwordReset";

import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext"; // ✅ correct
import Subscribe from "./pages/admin/subscribe";
import BlogPage from "./components/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductProvider> {/* ✅ wrap everything needing product context */}
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="deals" element={<Deals />} />
                <Route path="support" element={<Support />} />
                <Route path="account" element={<Account />} />
                <Route path="cart" element={<Cart />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="payment" element={<Checkout />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="Page" element={<KapeePage />} />
                <Route path="Element" element={<Element />} />
                 <Route path='/passwordReset' element={<PasswordReset />}  />
              </Route>

              {/* Admin Pages */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="orders" element={<Orders />} />
                <Route path="Setting" element={<Setting />} />
                <Route path="Messages" element={<Messages />} />
                <Route path="Report" element={<Report />} />
                <Route path="messages" element={<Messages />} />
                <Route path="subscribe" element={<Subscribe />} />
              </Route>
            </Routes>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
