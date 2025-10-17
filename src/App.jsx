import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NotFound from "./pages/notfound/NotFound";
//admin imports
import Login from "./Admin/auth/Login";
import AdminLayout from "./Admin/layout/AdminLayout";
import Dashboard from "./Admin/dashboard/Dashboard";
import Users from "./Admin/users/Users";
import CreateUser from "./Admin/users/CreateUser";
import CreateProduct from "./Admin/products/CreateProduct";
import Category from "./Admin/products/Category";
import Products from "./Admin/products/Products";
import CartAdmin from "./Admin/carts/CartAdmin";
//UI imports
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Checkout from "./pages/Checkout";
import FrontendLayout from "./pages/FrontendLayout";


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Admin routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Products />} />
          <Route path="admin-cart" element={<CartAdmin />} />
        </Route>

        {/* Frontend routes */}
        <Route path="/home" element={<FrontendLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
};


export default App;