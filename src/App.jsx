import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import Shop from "./pages/Shop"
import Product from "./pages/Product";
// import { ToastContainer } from 'react-toastify';
import Login from "./Admin/auth/Login";
import Layout from "./Admin/layout/Layout";
import Dashboard from "./Admin/dashboard/Dashboard";
import Users from "./Admin/users/Users";
import CreateUser from "./Admin/users/CreateUser";
import CreateProduct from "./Admin/products/CreateProduct";
import Category from "./Admin/products/Category";
import Products from "./Admin/products/Products";
import Cart from "./Admin/carts/Cart";
import Cellphones from "./pages/Cellphones";
import Automotive from "./pages/Automotive";
import Appliances from "./pages/Appliances";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/automotive" element={<Automotive />} />
        <Route path="/shop/cellphones" element={<Cellphones />} />
        <Route path="/shop/appliances" element={<Appliances />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;