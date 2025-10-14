import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/Loader";

function UserLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const [load, setLoad] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == "" || password == "") {
            return setErr(true);
        }

        const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
        if (!merchantData || !merchantData.id) {
            alert("No merchant logged in. Please log in as a merchant first.");
            navigate("/login");
            return;
        }

        const loginObj = {
            email,
            password,
        };

        try {
            setLoad(true);
            const resp = await api.post("/users/login", loginObj);
            const data = await resp.data;

            if (data.user && data.user.id) {
                localStorage.setItem("userData", JSON.stringify(data));
                alert("User sign in successfully");
                navigate("/dashboard");
            }
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log("Login failed:", err);
        } finally {
            setLoad(false);
        }
    };

    if (load) {
  return <Loader fullscreen message="Signing in..." />;
}

    return (
        <div className="account min-h-dvh bg-[#f9f9f9]">
            <div className="account_header text-center py-7">
                <h3 className="font-medium text-3xl">Login</h3>
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
                <div className="form_btn">
                    <button className="mt-4 text-center text-sm text-gray-700 bg-blue-950 text-white py-2 px-6 cursor-pointer w-50">Sign In</button>
                </div>
            </form>
        </div>
    );
}
export default UserLogin;