import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import { TiUserDelete } from "react-icons/ti";
import { TbUserEdit } from "react-icons/tb";
import { MdCategory, MdOutlineProductionQuantityLimits, MdCreateNewFolder, MdAdminPanelSettings } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUserGroup, FaRegUser } from "react-icons/fa6";
import { IoIosCreate, IoIosArrowDown } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { PiSignInBold } from "react-icons/pi";

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const MerchantUser = useState(null);
    const [load, setLoad] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);



    useEffect(() => {
        const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
        if (!merchantData) {
            navigate("/login");
            return;
        }
        const getUsers = async () => {
            try {
                const resp = await api.get("/users");
                const data = await resp.data;
                setUsers(data);
                setLoad(false);
            } catch (err) {
                console.log("Error fetching users:", err);
            }
        }
        getUsers();
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

                <div className="p-6 bg-gray-100 min-h-screen">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Users</h1>
                    <div>
                        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                            <table className="min-w-full border-collapse border border-gray-200 text-left">
                                <thead className="bg-teal-800 text-gray-100">
                                    <tr>
                                        <th className=" border-gray-200 p-3">S/N</th>
                                        <th className=" border-gray-200 p-3">First Name</th>
                                        <th className=" border-gray-200 p-3">Last Name</th>
                                        <th className=" border-gray-200 p-3">Email</th>
                                        <th className=" border-gray-200 p-3">Phone</th>
                                        <th className=" border-gray-200 p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => (
                                        <tr key={user._id}
                                            className="odd:bg-white even:bg-gray-50">
                                            <td className=" border-gray-200 p-4 text-gray-500">{i + 1}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.first_name}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.last_name}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.email}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.phone}</td>
                                            <td className=" border-gray-200 p-4 space-x-8">
                                                <button
                                                    // onClick={() => handleEdit(user)}
                                                    className="text-blue-600 hover:underline cursor-pointer"
                                                >
                                                    <TbUserEdit />
                                                </button>
                                                <button
                                                    // onClick={() => handleDelete(user._id)}
                                                    className="text-red-600 hover:underline cursor-pointer"
                                                >
                                                    <TiUserDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default Users;

