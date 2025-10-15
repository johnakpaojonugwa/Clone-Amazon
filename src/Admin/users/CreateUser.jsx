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

function CreateUser() {
    const navigate = useNavigate();
    const MerchantUser = useState(null);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const [load, setLoad] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (first_name == "" || last_name == "" || email == "" || phone == "" || password == "") {
            return setErr(true);
        }

        const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
        if (!merchantData || !merchantData.id) {
            alert("No merchant logged in. Please log in as a merchant first.");
            navigate("/login");
            return;
        }

        const userObj = {
            merchant_id: merchantData.id,
            first_name,
            last_name,
            email,
            phone,
            password,
        };

        try {
            setLoad(true);
            const resp = await api.post("/users", userObj);
            const data = await resp.data;

            if (data.id) {
                localStorage.setItem("userData", JSON.stringify(data));
                alert("User added successfully");
                navigate("/userlogin");
            }
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setPassword("");
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
        return <Loader fullscreen message="Creating user..." />;
    }

    return (
        <div className="bg-gray-100 flex h-screen">

            {/* Main Content */}
            <div className=" flex-1 overflow-y-auto">

                <div className="account min-h-dvh bg-[#f9f9f9]">
                    <div className="account_header text-center py-7">
                        <h3 className="font-medium text-3xl">Create User</h3>
                    </div>
                    <form className="w-[40%] mx-auto shadow-md p-5 bg-white" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                            {err == true && first_name == "" ? <span className="text-red-500 text-xs">First Name Required</span> : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                            {err == true && last_name == "" ? <span className="text-red-500 text-xs">Last Name Required</span> : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                            {err == true && email == "" ? <span className="text-red-500 text-xs">Email Required</span> : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                            {err == true && phone == "" ? <span className="text-red-500 text-xs">Phone Required</span> : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                            {err == true && password == "" ? <span className="text-red-500 text-xs">Password Required</span> : null}
                        </div>
                        <div className="form_btn">
                            <button className="mt-4 text-center text-sm text-gray-700 bg-teal-900 hover:bg-teal-600 text-white py-2 px-6 cursor-pointer w-50">Create User</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
}
export default CreateUser;
