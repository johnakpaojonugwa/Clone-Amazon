// import api from "../api";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Loader from "../components/Loader";

// function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [err, setErr] = useState(false);
//     const [load, setLoad] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (email == "" || password == "") {
//             return setErr(true);
//         }
//         setLoad(true);
//         try {
//             const resp = await api.post("merchants/login", { email, password });
//             const merchantData = await resp.data;

//             if (!merchantData) return alert("Invalid email or password");

//             localStorage.setItem("MerchantUser", JSON.stringify(merchantData));
//             alert("Login successful");
//             navigate("/dashboard");
//         } catch (err) {
//             console.log("Login failed:, err");
//         } finally {
//             setLoad(false);
//         }

//         setEmail('');
//         setPassword('');
//     }
//     if (load) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9]">
//                 <Loader message="Logging in..." />
//             </div>
//         );
//     }

//     return (
//         <div className="account min-h-dvh bg-[#f9f9f9]">
//             <div className="account_header text-center py-7">
//                 <h3 className="font-medium text-3xl">Login</h3>
//                 <p className="text-gray-500">Login to access dashboard</p>
//             </div>
//             <form className="w-[40%] mx-auto shadow-md p-5 bg-white" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
//                     {err == true && email == "" ? <span className="text-red-500 text-xs">Email Required</span> : null}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-sm shadow-sm" />
//                     {err == true && password == "" ? <span className="text-red-500 text-xs">Password Required</span> : null}
//                 </div>
//                 <div>
//                     <p>Do not have an account?
//                         <Link to="/register" className="text-blue-400">Register</Link>
//                     </p>
//                 </div>
//                 <div className="form_btn">
//                     <button className="mt-4 text-center text-sm text-gray-700 bg-blue-950 text-white py-2 px-6 cursor-pointer w-50">Login</button>
//                 </div>
//             </form>
//         </div>
//     );
// }
// export default Login;





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/Loader";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [err, setErr] = useState(false);
    const [load, setLoad] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (email === "" || password === "") {
            return setErr(true);
        }

        setLoad(true);

        try {
            const resp = await api.post("merchants/login", { email, password });
            const merchantData = await resp.data;

            if (!merchantData) return alert("Invalid email or password");

            localStorage.setItem("MerchantUser", JSON.stringify(merchantData));
            alert("Login successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        } finally {
            setLoad(false);
        }

        setFormData({
            email: "",
            password: ""
        });
    };

    if (load) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9]">
                <Loader message="Logging in..." />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#f9f9f9]">
            <div className="max-w-md w-full rounded-md border border-gray-200 py-8 px-6 bg-white shadow-md">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                    Welcome back!
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Please login to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 placeholder:text-gray-400"
                        />
                        {err && formData.email === "" && (
                            <span className="text-red-500 text-xs">Email required</span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 placeholder:text-gray-400"
                        />
                        {err && formData.password === "" && (
                            <span className="text-red-500 text-xs">Password required</span>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-500 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-950 text-white py-2 px-6 rounded-md hover:bg-blue-900 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
