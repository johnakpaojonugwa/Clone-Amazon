// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NotFound from "./pages/notfound/NotFound";
// //admin imports
// import Login from "./Admin/auth/Login";
// import AdminLayout from "./Admin/layout/AdminLayout";
// import Dashboard from "./Admin/dashboard/Dashboard";
// import Users from "./Admin/users/Users";
// import CreateUser from "./Admin/users/CreateUser";
// import CreateProduct from "./Admin/products/CreateProduct";
// import Category from "./Admin/products/Category";
// import Products from "./Admin/products/Products";
// import CartAdmin from "./Admin/carts/CartAdmin";
// //UI imports
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Register from "./pages/Register";
// import SignIn from "./pages/SignIn";
// import Checkout from "./pages/Checkout";
// import FrontendLayout from "./pages/FrontendLayout";
// import Cellphones from "./pages/Cellphones";
// import Automotive from "./pages/Automotive";
// import Appliances from "./pages/Appliances";
// import Product from "./pages/Product";
// import Shop from "./pages/Shop"



// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Admin routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<AdminLayout />}>
//           <Route path="" element={<Dashboard />} />
//           <Route path="users" element={<Users />} />
//           <Route path="createuser" element={<CreateUser />} />
//           <Route path="createproduct" element={<CreateProduct />} />
//           <Route path="category" element={<Category />} />
//           <Route path="products" element={<Products />} />
//           <Route path="admin-cart" element={<CartAdmin />} />
//         </Route>

//         {/* Frontend routes */}
//         <Route path="/home" element={<FrontendLayout />}>
//           <Route path="" element={<Home />} />
//           <Route path="shop" element={<Shop />} />
//           <Route path="product/:id" element={<Product />} />
//           <Route path="cart" element={<Cart />} />
//           <Route path="register" element={<Register />} />
//           <Route path="signin" element={<SignIn />} />
//           <Route path="checkout" element={<Checkout />} />
//           <Route path="shop" element={<Shop />} />
//           <Route path="shop/automotive" element={<Automotive />} />
//           <Route path="/shop/cellphones" element={<Cellphones />} />
//           <Route path="/shop/appliances" element={<Appliances />} />
//           {/* <Route path="/shop/:id" element={<Product />} /> */}
//         </Route>
//         {/* Not found route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   )
// };


// export default App;



import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";

// Admin imports
import Login from "./Admin/auth/Login";
import AdminLayout from "./Admin/layout/AdminLayout";
import Dashboard from "./Admin/dashboard/Dashboard";
import Users from "./Admin/users/Users";
import CreateUser from "./Admin/users/CreateUser";
import CreateProduct from "./Admin/products/CreateProduct";
import Category from "./Admin/products/Category";
import Products from "./Admin/products/Products";
import CartAdmin from "./Admin/carts/CartAdmin";

// UI imports
import FrontendLayout from "./pages/FrontendLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Checkout from "./pages/Checkout";
import Automotive from "./pages/Automotive";
import Cellphones from "./pages/Cellphones";
import Appliances from "./pages/Appliances";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* -------------------- ADMIN ROUTES -------------------- */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Products />} />
          <Route path="admin-cart" element={<CartAdmin />} />
        </Route>

        {/* -------------------- FRONTEND ROUTES -------------------- */}
        <Route path="/home" element={<FrontendLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/automotive" element={<Automotive />} />
          <Route path="shop/cellphones" element={<Cellphones />} />
          <Route path="shop/appliances" element={<Appliances />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* -------------------- NOT FOUND -------------------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
