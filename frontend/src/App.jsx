import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./responsive.css"; // Import responsive CSS for mobile/tablet support
import "./middlebar.css"; // Import Middlebar responsive styles
import "./dashboard.css"; // Import Dashboard/Admin responsive styles

import Home from "./pages/Home";
import Delivery from "./pages/delivery/Delivery";

// add these imports
import Login from "./pages/Login";
import Register from "./pages/Register";

import { PlantProvider } from "./context/PlantContext";
import { AppProvider } from "./context/AppContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "../src/context/ProductContext";
import { CartProvider } from "../src/context/CartContent"; // <-- added

import Billing from "./pages/buyer/Billing";
import Seller from "./pages/seller/Seller";
import MyProducts from "./pages/seller/MyProducts";
import Orders from "./pages/seller/Orders";
import Messages from "./pages/seller/Earnings";
import History from "./pages/seller/History";
import Settings from "./pages/seller/Setting";
import Analytics from "./pages/seller/Analytics";
import Support from "./pages/seller/Support";
import Earnings from "./pages/seller/Earnings";
import Dashboard from "./pages/seller/Dashboard";
import AddProduct from "./pages/seller/AddProduct";
import DeliveryForm from "./pages/delivery/DeliveryForm";
import DeliverySummary from "./pages/delivery/DeliverySummary";
import Admin from "./pages/admin/Admin";
import Buyer from "./pages/buyer/Buyer";
import Cart from "./pages/buyer/Cart"; // Cart component inside provider tree
import Wishlist from "./pages/buyer/Wishlist";
import BuyerManagement from "./pages/admin/BuyerManagement";
import SellerPlantDetails from "./pages/SellerPlantDetails";
import LandingPage from "./pages/LandingPage";
import DeskPage from "./pages/DeskPage";
import DoctorPage from "./pages/DoctorPage";
import YogaPage from "./pages/YogaPage";
import HomePlantsPage from "./pages/HomePlantsPage";
import FestivalPage from "./pages/FestivalPage";
import ProfilePage from "./components/ProfilePage";
import BuyerManagementPage from "./pages/admin/BuyerManagement";
import Details from "./pages/buyer/Details";
import Buyerhistory from "./pages/buyer/Buyerhistory";

// ✅ Navbar Component
function Navbar() {
  return (
    <div>
      {/* <nav className="bg-green-800 text-white p-4 flex justify-between items-center shadow-md"> */}
      {/* <h1 className="text-xl font-bold">Earthify Plant Portal</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-green-300">
          Home
        </Link>
        <Link to="/buyer" className="hover:text-green-300">
          Buyer
        </Link>
        <Link to="/seller" className="hover:text-green-300">
          Seller
        </Link>
        <Link to="/delivery" className="hover:text-green-300">
          Delivery
        </Link>
        <Link to="/admin" className="hover:text-green-300">
          Admin
        </Link>
        <Link to="/login" className="hover:text-green-300">
          Login
        </Link>
        <Link to="/register" className="hover:text-green-300">
          Register
        </Link>
      </div> */}
      {/* </nav> */}
      {/* <Navbar/> */}
    </div>
  );
}

// ✅ Footer Component
function Footer() {
  return (
    <footer className="bg-green-900 text-gray-200 py-6 mt-10 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Earthify Plant Portal. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

// ✅ Main App
export default function App() {
  // 🔥 Fix: declare users state
  const [users, setUsers] = useState([]);

  return (
    <AppProvider>
      <PlantProvider>
        <CartProvider>
          {" "}
          {/* <-- CartProvider wraps providers so Cart route gets context */}
          <ProductProvider>
            <OrderProvider>
              <Navbar />
              <main className="min-h-screen px-4">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/desk" element={<DeskPage />} />
                  <Route path="/doctor" element={<DoctorPage />} />
                  <Route path="/yoga" element={<YogaPage />} />
                  <Route path="/homeplants" element={<HomePlantsPage />} />
                  <Route path="/festival" element={<FestivalPage />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login users={users} />} />
                  <Route
                    path="/register"
                    element={<Register users={users} setUsers={setUsers} />}
                  />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* Seller Routes */}
                  <Route path="/seller" element={<Seller />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/my-products" element={<MyProducts />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/earnings" element={<Earnings />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/support" element={<Support />} />

                  {/* Buyer Routes */}
                  <Route path="/buyer" element={<Buyer />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/Buyerhistory" element={<Buyerhistory />} />
                  <Route path="/details" element={<Details />} />
                  {/* Delivery Routes */}
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/delivery/form" element={<DeliveryForm />} />
                  <Route
                    path="/delivery/summary"
                    element={<DeliverySummary />}
                  />

                  {/* Admin Route */}
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/buyers" element={<BuyerManagement />} />
                  <Route
                    path="/admin/sellers"
                    element={<SellerPlantDetails />}
                  />
                  <Route
                    path="/buyers/:buyerId"
                    element={<BuyerManagementPage />}
                  />
                </Routes>
              </main>
              {/* <Footer /> */}
            </OrderProvider>
          </ProductProvider>
        </CartProvider>
      </PlantProvider>
    </AppProvider>
  );
}
