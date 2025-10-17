import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SubHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setOpenMenu(false);
  };

  return (
    <>
      <div className="bg-[#232f3e] text-white text-sm py-2 px-4 flex items-center gap-4 overflow-x-auto">
        <button
          onClick={() => setOpenMenu(true)}
          className="flex items-center gap-1 focus:outline-none"
        >
          <FaBars />
          <span className="whitespace-nowrap">All</span>
        </button>
        <Link to="/shop" className="whitespace-nowrap hover:underline">
          Today's Deals
        </Link>
        <Link to={''} className="whitespace-nowrap hover:underline">Registry</Link>
        <Link to={''} className="whitespace-nowrap hover:underline">Prime Video</Link>
        <Link to={''} className="whitespace-nowrap hover:underline">Gift Cards</Link>
        <Link to={''} className="whitespace-nowrap hover:underline">Customer Service</Link>
        <Link to={''} className="whitespace-nowrap hover:underline">Sell</Link>
      </div>

      
      {openMenu && (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex cursor-pointer">
    
          <div className="bg-white w-72 h-full overflow-y-auto shadow-lg relative flex flex-col">
            <button
              onClick={() => setOpenMenu(false)}
              className="absolute top-3 right-3 text-gray-300 text-lg"
            >
              <FaTimes />
            </button>

            
            <div className="bg-[#232f3e] text-white p-4 font-semibold text-lg">
              Hello, {user ? user.first_name : <Link to={"/signin"} className="text-blue-500 underline">Sign in</Link>}
            </div>

          
            <div className="p-4 text-gray-800 text-sm flex-grow">
              <div className="mb-4">
                <h3 className="font-bold mb-2">Digital Content & Devices</h3>
                <ul className="space-y-1">
                  <li className="hover:bg-gray-100 p-1 rounded">Prime Video</li>
                  <li className="hover:bg-gray-100 p-1 rounded">Amazon Music</li>
                  <li className="hover:bg-gray-100 p-1 rounded">
                    Kindle E-readers & Books
                  </li>
                  <li className="hover:bg-gray-100 p-1 rounded">
                    Amazon Appstore
                  </li>
                </ul>
              </div>

              <div className="mb-4 border-t pt-3">
                <h3 className="font-bold mb-2">Shop by Department</h3>
                <ul className="space-y-1">
                  <li className="hover:bg-gray-100 p-1 rounded">Electronics</li>
                  <li className="hover:bg-gray-100 p-1 rounded">Computers</li>
                  <li className="hover:bg-gray-100 p-1 rounded">Smart Home</li>
                  <li className="hover:bg-gray-100 p-1 rounded">Arts & Crafts</li>
                  <li className="hover:bg-gray-100 p-1 rounded">See all</li>
                </ul>
              </div>

              <div className="mb-4 border-t pt-3">
                <h3 className="font-bold mb-2">Programs & Features</h3>
                <ul className="space-y-1">
                  <li className="hover:bg-gray-100 p-1 rounded">Gift Cards</li>
                  <li className="hover:bg-gray-100 p-1 rounded">
                    Shop with Points
                  </li>
                  <li className="hover:bg-gray-100 p-1 rounded">
                    Amazon Assistant
                  </li>
                  <li className="hover:bg-gray-100 p-1 rounded">
                    Subscribe & Save
                  </li>
                </ul>
              </div>
            </div>

            {user && (
              <div className="p-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium"
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          <div className="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}
    </>
  );
};

export default SubHeader;
