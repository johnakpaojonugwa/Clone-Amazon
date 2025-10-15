import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Nav = () => (
  <nav className="bg-[#131921] text-white p-2 text-sm">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg text-white"><Link to={"/"}>Amazon</Link></span>
        <span className="hidden md:block text-xs">Deliver to Nigeria</span>
      </div>

      <div className="flex-grow mx-4 hidden md:flex">
        <input
          type="text"
          placeholder="Search Amazon"
          className="w-full p-2 rounded-l-md text-black bg-white h-[40px]"
        />
        <button className="bg-orange-400 p-2 rounded-r-md">
          <FaSearch />
        </button>
      </div>

      <div className="flex items-center gap-6 text-xs">
        <span>
          Hello, <Link to={"/login"} className="text-blue-400">Sign IN</Link><br />
          <strong>Account & Lists</strong>
        </span>
        <span>
          Returns<br />
          <strong>& Orders</strong>
        </span>
        <Link to="/cart" className="flex items-center gap-1">
          <FaShoppingCart />
          Cart
        </Link>
      </div>
    </div>
  </nav>
);

export default Nav;
