import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import "./App.css"
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Nav from "./components/Nav";
import SubHeader from "./components/SubHeader";
import SubFooter from "./components/SubFooter";
import MainFooter from "./components/MainFooter";

function App() {
  return (
    <BrowserRouter>
    <Nav/>
    <SubHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/shop" element={<Shop/>} />
      </Routes>
      <SubFooter/>
      <MainFooter/>
    </BrowserRouter>
  )
}

export default App;