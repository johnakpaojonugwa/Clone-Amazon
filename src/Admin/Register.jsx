import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [store_name, setStoreName] = useState("");
    const [descp, setDescp] = useState("");
    const [icon, setIcon] = useState("");
    const [banner, setBanner] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (first_name == "" || last_name == "" || email == "" || phone == "" || store_name == "" || descp == "" || icon == "" || banner == "" || password == "") {
            return setErr(true);
        }
        const merchantObj = {
            first_name,
            last_name,
            email,
            phone,
            store_name,
            descp,
            icon,
            banner,
            password,
        };

        try {
            const resp = await api.post("/merchants", merchantObj);
            const data = resp.data;

            localStorage.setItem("merchant_id", resp.data.id);
            if (data.id) {
                alert("merchant created successfully");
                console.log("Merchant data:", data);
                navigate("/login");
            } else {
                alert("an error occurred");
            }
        } catch (err) {
            console.log("Error creating merchant:", err);
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setStoreName('');
        setDescp('');
        setIcon('');
        setBanner('');
        setPassword('');
    }

    return (
        <div className="account min-h-dvh bg-[#f9f9f9]">
            <div className="account_header text-center py-7">
                <h3 className="font-medium text-3xl">Register Merchant</h3>
                <p className="text-gray-500">Register to create a free merchant account</p>
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
                    <label htmlFor="store_name" className="block text-sm font-medium text-gray-700">Store Name</label>
                    <input type="text" value={store_name} onChange={(e) => setStoreName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                    {err == true && store_name == "" ? <span className="text-red-500 text-xs">Store Name Required</span> : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="descp" className="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" value={descp} onChange={(e) => setDescp(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                    {err == true && descp == "" ? <span className="text-red-500 text-xs">Description Required</span> : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon</label>
                    <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                    {err == true && icon == "" ? <span className="text-red-500 text-xs">Icon Required</span> : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Banner</label>
                    <input type="text" value={banner} onChange={(e) => setBanner(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                    {err == true && banner == "" ? <span className="text-red-500 text-xs">Banner Required</span> : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                    {err == true && password == "" ? <span className="text-red-500 text-xs">Password Required</span> : null}
                </div>
                <div className="form_btn">
                    <button className="mt-4 text-center text-sm text-gray-700 bg-blue-950 text-white py-2 px-6 cursor-pointer w-50">Submit</button>
                </div>
            </form>
        </div>
    );
}
export default Register;