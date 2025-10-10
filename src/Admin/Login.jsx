import api from "../api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == "" || password == "") {
            return setErr(true);
        }
        try {
            const resp = await api.post("merchants/login", { email, password });
            const merchantData = await resp.data;
            if (!merchantData) return alert("Invalid email or password");

            localStorage.setItem("MerchantUser", JSON.stringify(merchantData));
            alert("Login successful");
            navigate("/dashboard");
        } catch (err) {
            console.log("Login failed:, err");
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className="account min-h-dvh bg-[#f9f9f9]">
            <div className="account_header text-center py-7">
                <h3 className="font-medium text-3xl">Login</h3>
                <p className="text-gray-500">Login to access dashboard</p>
            </div>
            <form className="w-[40%] mx-auto shadow-md p-5 bg-white" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                    {err == true && email == "" ? <span className="text-red-500 text-xs">Email Required</span> : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
                    {err == true && password == "" ? <span className="text-red-500 text-xs">Password Required</span> : null}
                </div>
                <div>
                    <p>Do not have an account?
                        <Link to="/register" className="text-blue-400">Register</Link>
                    </p>
                </div>
                <div className="form_btn">
                    <button className="mt-4 text-center text-sm text-gray-700 bg-blue-950 text-white py-2 px-6 cursor-pointer w-50">Login</button>
                </div>
            </form>
        </div>
    );
}
export default Login;