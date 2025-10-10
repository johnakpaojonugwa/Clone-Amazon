import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Register from "./Admin/Register";
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import Users from "./Admin/Users";
import CreateUser from "./Admin/CreateUser";
import CreateProduct from "./Admin/CreateProduct";
import Category from "./Admin/Category";
import Products from "./Admin/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/category" element={<Category />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;