import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
    const { API_BASE_URL, setMerchantUser, loading, setLoading } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.warning("Please fill in both email and password");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE_URL}/merchants/login`, {
                email: formData.email,
                password: formData.password,
            });

            const userData = res.data;

            if (userData && userData.id) {
                setMerchantUser(userData);
                sessionStorage.setItem("merchantUser", JSON.stringify(userData));

                toast.success(`Welcome back, ${userData.name || "merchant"}!`);
                setTimeout(() => {
                    navigate("/dashboard");
                    setLoading(false);
                }, 2000);
            } else {
                toast.error("Invalid email or password");
                setLoading(false);
            }
        } catch (error) {
            console.log("Login error:", error);
            toast.error("Server error. Please try again");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <ToastContainer />
            <div className="max-w-md w-full rounded-md border border-gray-100 py-5 px-5 font-bold shadow-md bg-white">
                <h2 className="text-center text-xl mb-5">Welcome back!</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="mt-3">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email:
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none placeholder:text-gray-300 placeholder:font-medium"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password:
                        </label>
                        <div className="relative">
                            <RiLockPasswordFill className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none placeholder:text-gray-300 placeholder:font-medium"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        type="submit"
                        className={`mt-4 w-full text-center text-sm text-white py-2 rounded-md transition-colors ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-amber-950 hover:bg-amber-900"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Login;
