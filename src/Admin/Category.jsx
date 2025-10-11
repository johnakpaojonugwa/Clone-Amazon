import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import { MdCategory, MdOutlineProductionQuantityLimits, MdCreateNewFolder, MdAdminPanelSettings } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUserGroup, FaRegUser } from "react-icons/fa6";
import { IoIosCreate, IoIosArrowDown } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { PiSignInBold } from "react-icons/pi";

function Category() {
    const navigate = useNavigate();
    const MerchantUser = useState(null);
    const [category_name, setCategoryName] = useState("");
    const [category_image, setCategoryImage] = useState("");
    const [err, setErr] = useState(false);
    const [load, setLoad] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (category_name == "" || category_image == "" ) {
            return setErr(true);
        }

        const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
        if (!merchantData || !merchantData.id) {
            alert("No merchant logged in. Please log in as a merchant first.");
            navigate("/login");
            return;
        }

        const categoryData = {
            merchant_id: merchantData.id,
            name: category_name,
            image: category_image
        };

        try {
            setLoad(true);
            const resp = await api.post("/categories", categoryData);
            const data = await resp.data;

            setCategoryName("");
            setCategoryImage("");
        } catch (err) {
            console.log("Error creating user:", err);
        } finally {
            setLoad(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("MerchantUser");
        alert("Logged out successfully");
        navigate("/login");
    };

    if (load) {
        return <Loader fullscreen message="Creating category..." />;
    }

    return (
        <div className="bg-gray-100 flex h-screen">
            {/* Sidebar */}
            <section className="w-64 bg-teal-800 text-gray-300 flex flex-col fixed top-0 self-start h-screen">
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
            <div className="ml-64 flex-1 overflow-y-auto">
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

                <div className="account min-h-dvh bg-[#f9f9f9]">
                    <div className="account_header text-center py-7">
                        <h3 className="font-medium text-3xl">Category</h3>
                    </div>
                    <form className="w-[40%] mx-auto shadow-md p-5 bg-white" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input type="text" value={category_name} onChange={(e) => setCategoryName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                            {err == true && category_name == "" ? <span className="text-red-500 text-xs">Category Name Required</span> : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category_image" className="block text-sm font-medium text-gray-700">Category Image</label>
                            <input type="text" value={category_image} onChange={(e) => setCategoryImage(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                            {err == true && category_image == "" ? <span className="text-red-500 text-xs">Category Image Required</span> : null}
                        </div>
                        <div className="form_btn">
                            <button className="mt-4 text-center text-sm text-gray-700 bg-blue-950 text-white py-2 px-6 cursor-pointer w-50">Create category</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
}
export default Category;
