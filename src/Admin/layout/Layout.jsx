// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { RiDashboardHorizontalFill } from "react-icons/ri";
// import {
//     MdCategory,
//     MdOutlineProductionQuantityLimits,
//     MdCreateNewFolder,
//     MdAdminPanelSettings,
// } from "react-icons/md";
// import { IoIosCreate, IoIosArrowDown } from "react-icons/io";
// import { FaUserGroup, FaRegUser } from "react-icons/fa6";
// import { BsCart2 } from "react-icons/bs";
// import { useEffect, useState } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { useApp } from "../../context/AppContext";

// function Layout() {
//     const [MerchantUser, setMerchantUser] = useState(null);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("MerchantUser"));
//         if (storedUser) setMerchantUser(storedUser);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("MerchantUser");
//         alert("Logged out successfully");
//         navigate("/");
//     };

//     return (
        
// }

// export default Layout;




import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import {
    MdCategory,
    MdOutlineProductionQuantityLimits,
    MdCreateNewFolder,
    MdAdminPanelSettings,
} from "react-icons/md";
import { IoIosCreate, IoIosArrowDown } from "react-icons/io";
import { FaUserGroup, FaRegUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { PiSignInBold } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";

function Layout() {
    const [MerchantUser, setMerchantUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true); // 👈 toggle sidebar visibility
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("MerchantUser"));
        if (storedUser) setMerchantUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("MerchantUser");
        alert("Logged out successfully");
        navigate("/");
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`bg-[#022C22] text-white flex flex-col p-5 fixed top-0 left-0 h-screen transition-all duration-300 z-50
                ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}
            >
                <div className="p-6 text-2xl font-bold border-b border-teal-700 flex items-center justify-between">
                    Admin. <MdAdminPanelSettings className="text-3xl" />
                </div>

                <nav className="flex-1 space-y-3 mt-3">
                    <NavLink
                        to=""
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2 px-3 rounded ${isActive ? "bg-teal-800" : "hover:bg-teal-900"}`
                        }
                    >
                        <RiDashboardHorizontalFill className="text-2xl" /> Dashboard
                    </NavLink>

                    <NavLink
                        to="category"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2 px-3 rounded ${isActive ? "bg-teal-800" : "hover:bg-teal-900"}`
                        }
                    >
                        <MdCategory className="text-2xl" /> Category
                    </NavLink>

                    <NavLink
                        to="products"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2 px-3 rounded ${isActive ? "bg-teal-800" : "hover:bg-teal-900"}`
                        }
                    >
                        <MdOutlineProductionQuantityLimits className="text-2xl" /> Products
                    </NavLink>

                    <NavLink
                        to="users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2 px-3 rounded ${isActive ? "bg-teal-800" : "hover:bg-teal-900"}`
                        }
                    >
                        <FaUserGroup className="text-2xl" /> Users
                    </NavLink>

                    <NavLink
                        to="createproduct"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2 px-3 rounded ${isActive ? "bg-teal-800" : "hover:bg-teal-900"}`
                        }
                    >
                        <IoIosCreate className="text-2xl" /> Create Product
                    </NavLink>

                    <NavLink
                        to="createuser"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2 px-3 rounded ${isActive ? "bg-teal-800" : "hover:bg-teal-900"}`
                        }
                    >
                        <MdCreateNewFolder className="text-2xl" /> Create User
                    </NavLink>

                    <NavLink
                        to="cart"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2 px-3 rounded ${isActive ? "bg-teal-800" : "hover:bg-teal-900"}`
                        }
                    >
                        <BsCart2 className="text-2xl" /> Cart
                    </NavLink>
                </nav>

                <div className="mt-auto flex items-center gap-3 py-2 px-3 hover:bg-teal-900 rounded cursor-pointer">
                    <button onClick={handleLogout} className="flex items-center gap-2">
                        <PiSignInBold className="text-3xl" />
                        Sign out
                    </button>
                </div>

                <div className="p-4 border-t border-teal-700 text-xs text-gray-400">
                    &copy; 2025 Rework Admin
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
                <header className="flex justify-between items-center p-5 bg-white shadow sticky top-0 z-40">
                    {/* Sidebar Toggle Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-2xl text-gray-700 hover:text-black"
                    >
                        <IoMenu />

                    </button>

                    {/* User Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-2"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <h4 className="font-light text-sm">
                                Hi,{" "}
                                <span className="text-gray-700 font-semibold">
                                    {MerchantUser?.first_name || "Admin"}
                                </span>
                            </h4>
                            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold">
                                <FaRegUser />
                            </span>
                            <IoIosArrowDown />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg z-50 shadow-md">
                                <div className="px-4 py-4 text-sm text-gray-700 space-y-2">
                                    <p>
                                        <strong>Name:</strong> {MerchantUser?.first_name || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {MerchantUser?.email || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Store Name:</strong> {MerchantUser?.store_name || "N/A"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <main className="flex-1 bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
