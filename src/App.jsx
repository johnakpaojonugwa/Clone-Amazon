import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NotFound from "./pages/notfound/NotFound";
import Register from "./Admin/auth/Register";
import Login from "./Admin/auth/Login";
import Layout from "./Admin/layout/Layout";
import Dashboard from "./Admin/dashboard/Dashboard";
import Users from "./Admin/users/Users";
import CreateUser from "./Admin/users/CreateUser";
import CreateProduct from "./Admin/products/CreateProduct";
import Category from "./Admin/products/Category";
import Products from "./Admin/products/Products";
import Cart from "./Admin/carts/Cart";
import UserLogin from "./Admin/users/UserLogin";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="createuser" element={<CreateUser />} />
        <Route path="userlogin" element={<UserLogin />} />
        <Route path="createproduct" element={<CreateProduct />} />
        <Route path="category" element={<Category />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App;