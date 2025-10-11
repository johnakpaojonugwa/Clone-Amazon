import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { MdCategory, MdOutlineProductionQuantityLimits, MdCreateNewFolder, MdAdminPanelSettings } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUserGroup, FaRegUser } from "react-icons/fa6";
import { IoIosCreate, IoIosArrowDown } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { PiSignInBold } from "react-icons/pi";

function Dashboard() {
    const navigate = useNavigate();
    const [MerchantUser, setMerchant] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCartProducts, setTotalCartProducts] = useState(0);
    const [products, setProducts] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
        if (!merchantData) {
            alert("Merchant not found. Please log in.");
            navigate("/login");
            return;
        }
        setMerchant(merchantData);
        const userData = JSON.parse(localStorage.getItem("Account_login")) || {};

        const fetchTotalProducts = async () => {
            try {
                const res = await api.get(`/products?merchant_id=${merchantData.id}`);
                const data = await res.data;
                const count = data.total ?? (Array.isArray(data) ? data.length : 0);
                setLoad(false);
                setTotalProducts(count);
            } catch (err) {
                console.error("Error fetching total products:", err);
            }
        };

        const fetchTotalUsers = async () => {
            try {
                const res = await api.get(`/users`);
                setLoad(false);
                setTotalUsers(res.data.length);
            } catch (err) {
                console.error("Error fetching total users:", err);
            }
        };

        const fetchTotalCartProducts = async () => {
            const user_id = userData?.id;
            if (!user_id) {
                // console.log("No user logged in");
                setTotalCartProducts(0);
                return;
            }

            try {
                const res = await api.get(`/carts?user_id=${user_id}`);
                const cartItems = res.data.data || res.data || [];
                const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
                setLoad(false);
                setTotalCartProducts(totalQuantity);
            } catch (err) {
                console.error("Error fetching cart count:", err);
                setTotalCartProducts(0);
            }
        };

        const fetchProducts = async () => {
            try {
                const res = await api.get(`/products?merchant_id=${merchantData.id}`);
                const data = Array.isArray(res.data) ? res.data : res.data.data || [];
                setLoad(false);
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchTotalProducts();
        fetchTotalUsers();
        fetchTotalCartProducts();
        fetchProducts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("MerchantUser");
        alert("Logged out successfully");
        navigate("/login");
    };

    if (load) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 flex h-screen">
            {/* Sidebar */}
            <section className="w-64 bg-teal-800 text-gray-300 flex flex-col sticky top-10 self-start h-screen">
                <div className="p-6 text-2xl font-bold border-b border-teal-700 flex items-center justify-between">
                    Admin. <MdAdminPanelSettings className="text-3xl" />
                </div>
                <nav className="flex-1 space-y-3">
                    <Link to="/dashboard" className="flex items-center gap-3 py-2 px-3 hover:bg-teal-900"><RiDashboardHorizontalFill className="text-3xl" />Dashboard</Link>
                    <Link to="/category" className="flex items-center gap-3 py-2 px-3 hover:bg-teal-900"><MdCategory className="text-3xl" /> Category</Link>
                    <Link to="/products" className="flex items-center gap-3 py-2 px-3 hover:bg-teal-900"><MdOutlineProductionQuantityLimits className="text-3xl" /> Products</Link>
                    <Link to="/users" className="flex items-center gap-3 py-2 px-3 hover:bg-teal-900"><FaUserGroup className="text-3xl" /> Users</Link>
                    <Link to="/createproduct" className="flex items-center gap-3 py-2 px-3 hover:bg-teal-900"><IoIosCreate className="text-3xl" /> Create Product</Link>
                    <Link to="/createuser" className="flex items-center gap-3 py-2 px-3 hover:bg-teal-900"><MdCreateNewFolder className="text-3xl" /> Create User</Link>
                    <Link to="/cart" className="flex items-center gap-3 py-2 px-3 hover:bg-teal-900"><BsCart2 className="text-3xl" /> Cart</Link>
                </nav>
                <div className="flex items-center gap-3 py-2 my-50 cursor-pointer px-3 hover:bg-teal-900 mt-auto">
                    <button onClick={handleLogout} className="flex items-center gap-2">
                        <PiSignInBold className="text-3xl" />
                        Sign out
                    </button>
                </div>
                <div className="p-4 border-t border-teal-700 text-sm flex flex-col gap-2">
                    <p className="text-xs text-gray-400">&copy; 2025 Rework Admin</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center p-5 bg-white shadow">
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                    <div className="relative">
                        <button
                            className="flex items-center gap-2"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <h4 className="font-light text-sm">
                                Hi, <span className="text-gray-700 font-semibold">{MerchantUser?.first_name}</span>
                            </h4>
                            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold">
                                <FaRegUser />
                            </span>
                            <span>
                                <IoIosArrowDown />
                            </span>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg z-50">
                                <div className="px-4 py-4 text-sm text-gray-700 space-y-4 shadow-md">
                                    <p className="font-bold text-sm">
                                        Name: <span className="font-light">{MerchantUser?.first_name}</span>
                                    </p>
                                    <p className="font-bold text-sm">
                                        Email: <span className="font-light">{MerchantUser?.email}</span>
                                    </p>
                                    <p className="font-bold text-sm">
                                        Store Name: <span className="font-light">{MerchantUser?.store_name}</span>
                                    </p>
                                </div>
                                <div className="border-t">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Summary Cards */}
                <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-sm text-gray-500">Total Products</h2>
                        <p className="text-2xl font-bold mt-2">{totalProducts}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-sm text-gray-500">Total Users</h2>
                        <p className="text-2xl font-bold mt-2">{totalUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-sm text-gray-500">Total Products in Carts</h2>
                        <p className="text-2xl font-bold mt-2">{totalCartProducts}</p>
                    </div>
                </section>

                {/* Product Table */}
                <header>
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b border-gray-200 pb-3">
                        Products
                    </h2>
                </header>
                {load ? (
                    <Loader message="Loading products..." />
                ) : products.length ? (
                    <div className="overflow-x-auto px-6 sticky md:top-10 self-start">
                    <table className="min-w-full border-collapse border border-gray-200 text-left">
                        <thead className="bg-teal-800 text-white">
                            <tr>
                                <th className="border border-gray-200 p-3">Title</th>
                                <th className="border border-gray-200 p-3">Image</th>
                                <th className="border border-gray-200 p-3">Price</th>
                                <th className="border border-gray-200 p-3">Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => (
                                <tr key={i}>
                                    <td className="border border-gray-200 p-3">{product.title}</td>
                                    <td className="border border-gray-200 p-3">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 object-contain mx-auto rounded-sm"
                                        />
                                    </td>
                                    <td className="border border-gray-200 p-3">{product.price}</td>
                                    <td className="border border-gray-200 p-3">{product.brand}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                    <p className="text-center text-gray-500">No products found</p>
                )}
                
            </div>
        </div>
    );
}

export default Dashboard;
