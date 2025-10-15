
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import {
    MdCategory,
    MdOutlineProductionQuantityLimits,
    MdCreateNewFolder,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoIosCreate, IoIosArrowDown } from "react-icons/io";
import { FaUserGroup, FaRegUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { PiSignInBold } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { useApp } from "../../context/AppContext";

function Layout() {
    const { merchantUser, setMerchantUser, theme, toggleTheme } = useApp();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!merchantUser) {
            const storedUser = sessionStorage.getItem("merchantUser");
            if (storedUser) {
                setMerchantUser(JSON.parse(storedUser));
            }
        }
    }, [merchantUser, setMerchantUser]);

    const handleLogout = () => {
        sessionStorage.removeItem("merchantUser");
        setMerchantUser(null);
        alert("Logged out successfully");
        navigate("/");
    };

    const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
    const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";

    return (
        <div className={`flex h-screen ${bgColor} ${textColor} transition-all duration-300`}>
            {/* Sidebar */}
            <aside
                className={`
                    ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
                    fixed top-0 left-0 h-screen flex flex-col shadow-lg border-r border-gray-200
                    transition-all duration-300 z-50 ${sidebarOpen ? "w-64" : "w-20 overflow-hidden"}
                `}
            >
                {/* Logo / Title */}
                <div className="p-6 text-2xl font-bold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <FaHome className="text-teal-500" /> Admin
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 mt-2">
                    {[
                        { to: "", label: "Dashboard", icon: <RiDashboardHorizontalFill /> },
                        { to: "category", label: "Category", icon: <MdCategory /> },
                        { to: "products", label: "Products", icon: <MdOutlineProductionQuantityLimits /> },
                        { to: "users", label: "Users", icon: <FaUserGroup /> },
                        { to: "createproduct", label: "Create Product", icon: <IoIosCreate /> },
                        { to: "createuser", label: "Create User", icon: <MdCreateNewFolder /> },
                        { to: "cart", label: "Cart", icon: <BsCart2 /> },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex items-center gap-3 py-2 px-3 transition-all duration-200
                                hover:bg-teal-600 hover:text-white ${
                                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className={`${sidebarOpen ? "block" : "hidden"}`}>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 py-3 px-3 hover:bg-red-600 hover:text-white rounded-lg cursor-pointer transition-all"
                >
                    <PiSignInBold className="text-2xl" />
                    {sidebarOpen && <span>Sign out</span>}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-600 text-xs text-gray-400 text-center">
                    &copy; 2025 Rework Admin
                </div>
            </aside>

            {/* Main Section */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
                {/* Header */}
                <header
                    className={`flex justify-between items-center p-5 shadow-md sticky top-0 z-40
                        ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
                >
                    {/* Sidebar Toggle */}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl hover:opacity-75">
                        <IoMenu />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-lg shadow-sm font-medium transition-all ${
                            theme === "dark"
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>

                    {/* User Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-500 transition-all"
                        >
                            <FaRegUser className="text-lg" />
                            <span className="font-medium hidden sm:block">
                                {merchantUser?.first_name || "Admin"}
                            </span>
                            <IoIosArrowDown />
                        </button>

                        {dropdownOpen && (
                            <div
                                className={`absolute right-0 mt-3 w-64 rounded-lg shadow-lg border ${
                                    theme === "dark"
                                        ? "bg-gray-800 border-gray-700 text-gray-200"
                                        : "bg-white border-gray-200 text-gray-800"
                                }`}
                            >
                                <div className="px-4 py-4 text-sm space-y-2">
                                    <p>
                                        <strong>Name:</strong> {merchantUser?.first_name || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {merchantUser?.email || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Store:</strong> {merchantUser?.store_name || "N/A"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <main
                    className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
                        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
                    }`}
                >
                    {/* Render all page content (including your summary cards) */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;

