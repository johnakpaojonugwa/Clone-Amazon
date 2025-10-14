import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/Loader";
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
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center p-5 bg-white shadow">
                    <h1 className="text-xl font-semibold text-gray-800">Category</h1>
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
