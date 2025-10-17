import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const response = await axios.post(`${baseURL}/users/login`, {
        email: formData.email,
        password: formData.password,
      });

      // ✅ Check if response is valid
      if (
        response.status === 200 &&
        response.data &&
        (response.data.user || response.data.id || response.data.first_name)
      ) {
        // Save only user info to localStorage
        sessionStorage.setItem("user", JSON.stringify(response.data.user || response.data));
        alert("✅ Login successful!");
        navigate("/");
      } else {
        throw new Error("Invalid login response from server.");
      }
    } catch (error) {
      console.error("❌ Login failed:", error);

      if (error.response) {
        setApiError(error.response.data.message || "Invalid email or password.");
      } else if (error.request) {
        // Request made but no response
        setApiError("No response from server. Please try again.");
      } else {
        // Something else went wrong
        setApiError("Login failed. Please check your details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-2 mb-3">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon"
        className="h-8 mb-4"
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-gray-300 rounded-md p-6"
      >
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        {/* Email */}
        <label className="block text-sm font-medium mb-1 mt-4">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
        {errors.email && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.email}
          </span>
        )}

        {/* Password */}
        <label className="block text-sm font-medium mb-1 mt-4 mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
        {errors.password && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.password}
          </span>
        )}

        {/* API error */}
        {apiError && (
          <p className="text-xs text-red-600 mt-3 text-center">{apiError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 rounded-full py-2 text-sm font-medium border border-yellow-600 transition !mt-2"
        >
          {loading ? "Signing in..." : "Continue"}
        </button>

        <div className="text-sm mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="text-xs text-gray-600 mt-6 text-center">
          By continuing, you agree to Amazon&apos;s{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Notice
          </a>
          .
        </p>
      </form>
    </div>
  );
}

export default SignIn;
