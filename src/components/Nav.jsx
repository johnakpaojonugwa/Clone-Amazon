import { Link } from "react-router-dom";
import { FaSearch, FaOpencart  } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function Nav() {
  const user = JSON.parse(sessionStorage.getItem("user"))
  const { cartItems } = useApp();

  return (
    <nav className="bg-[#131921] text-white p-2 text-sm">
      <div className="flex items-center justify-between w-[98%] mx-auto">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg text-white"><Link to={"/home"}>Amazon</Link></span>
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
            Hello,{" "}
            {user ? (
              <span className="text-yellow-600 font-semibold">
                {user.first_name}
              </span>
            ) : (
              <Link to="/home/signin" className="text-blue-400">
                Sign In
              </Link>
            )}
            <br />
            <strong>Account & Lists</strong>
          </span>

          <span>
            Returns<br />
            <strong>& Orders</strong>
          </span>
          <Link to="/home/cart" className="flex items-center gap-1  text-xs">
            <div className="relative">
          <FaOpencart size={30} />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center text-xs">
            {cartItems.length}
          </div>
        </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
