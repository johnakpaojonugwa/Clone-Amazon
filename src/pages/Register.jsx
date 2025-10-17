// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName) newErrors.firstName = "First name is required.";
//     if (!formData.lastName) newErrors.lastName = "Last name is required.";
//     if (!formData.email) newErrors.email = "Email is required.";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Invalid email format.";
//     if (!formData.phone)
//       newErrors.phone = "Phone number is required.";
//     else if (!/^\d{10,}$/.test(formData.phone))
//       newErrors.phone = "Enter a valid phone number.";
//     if (!formData.password)
//       newErrors.password = "Password is required.";
//     else if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters.";
//     if (formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match.";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     try {
//       setLoading(true);
//       const response = await axios.post(`${baseURL}/users`, {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       });

//       console.log("✅ Registration successful:", response.data);
//       alert("Account created successfully!");
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//       });
//       navigate("/signin")
//     } catch (error) {
//       console.error("❌ Registration failed:", error);
//       if (error.response) {
//         alert(error.response.data.message || "Registration failed.");
//       } else {
//         alert("Network error. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white mt-4">
//       {/* Amazon logo */}
//       <img
//         src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
//         alt="Amazon"
//         className="h-8 mb-6"
//       />

//       {/* Form container */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm border border-gray-300 rounded-md p-6"
//       >
//         <h1 className="text-2xl font-semibold mb-4">Create account</h1>

//         {/* First Name */}
//         <label className="block text-sm font-medium mb-1">First name</label>
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
//         />
//         {errors.firstName && (
//           <span className="text-xs text-red-500 mt-1 block">
//             {errors.firstName}
//           </span>
//         )}

//         {/* Last Name */}
//         <label className="block text-sm font-medium mb-1 mt-4">Last name</label>
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
//         />
//         {errors.lastName && (
//           <span className="text-xs text-red-500 mt-1 block">
//             {errors.lastName}
//           </span>
//         )}

//         {/* Email */}
//         <label className="block text-sm font-medium mb-1 mt-4">
//           Email address
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
//         />
//         {errors.email && (
//           <span className="text-xs text-red-500 mt-1 block">
//             {errors.email}
//           </span>
//         )}

//         {/* Phone */}
//         <label className="block text-sm font-medium mb-1 mt-4">
//           Phone number
//         </label>
//         <input
//           type="tel"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
//         />
//         {errors.phone && (
//           <span className="text-xs text-red-500 mt-1 block">
//             {errors.phone}
//           </span>
//         )}

//         {/* Password */}
//         <label className="block text-sm font-medium mb-1 mt-4">
//           Password (at least 6 characters)
//         </label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
//         />
//         <p className="text-xs text-gray-600 mt-1 mb-1 flex items-center gap-1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 text-blue-500"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M13 16h-1v-4h-1m1-4h.01M12 20.5A8.5 8.5 0 1012 3.5a8.5 8.5 0 000 17z"
//             />
//           </svg>
//           Passwords must be at least 6 characters.
//         </p>
//         {errors.password && (
//           <span className="text-xs text-red-500 mt-1 block">
//             {errors.password}
//           </span>
//         )}

//         {/* Confirm Password */}
//         <label className="block text-sm font-medium mb-1 mt-4">
//           Re-enter password
//         </label>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
//         />
//         {errors.confirmPassword && (
//           <span className="text-xs text-red-500 mt-1 block">
//             {errors.confirmPassword}
//           </span>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-yellow-400 hover:bg-yellow-500 rounded-full py-2 text-sm font-medium border border-yellow-600 transition mt-6"
//         >
//           {loading ? "Creating..." : "Continue"}
//         </button>

//         {/* Footer */}
//         <div className="text-sm mt-6">
//           <p className="text-gray-700">
//             Already a customer?{" "}
//             <Link to={"/signin"} className="text-blue-600 hover:underline">
//               Sign in instead
//             </Link>
//           </p>
//         </div>

//         <p className="text-xs text-gray-600 mt-6">
//           By creating an account, you agree to Amazon&apos;s{" "}
//           <a href="#" className="text-blue-600 hover:underline">
//             Conditions of Use
//           </a>{" "}
//           and{" "}
//           <a href="#" className="text-blue-600 hover:underline">
//             Privacy Notice
//           </a>
//           .
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;




import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Register() {
  const { API_BASE_URL, loading, setLoading } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10,}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number.";
    if (!formData.password)
      newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/users`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("✅ Registration successful:", response.data);
      alert("Account created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/signin");
    } catch (error) {
      console.error("❌ Registration failed:", error);
      if (error.response) {
        alert(error.response.data.message || "Registration failed.");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white mt-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon"
        className="h-8 mb-6"
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-gray-300 rounded-md p-6"
      >
        <h1 className="text-2xl font-semibold mb-4">Create account</h1>

        {/* First Name */}
        <label className="block text-sm font-medium mb-1">First name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1"
        />
        {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}

        {/* Last Name */}
        <label className="block text-sm font-medium mb-1 mt-4">Last name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1"
        />
        {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}

        {/* Email */}
        <label className="block text-sm font-medium mb-1 mt-4">Email address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1"
        />
        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}

        {/* Phone */}
        <label className="block text-sm font-medium mb-1 mt-4">Phone number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1"
        />
        {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}

        {/* Password */}
        <label className="block text-sm font-medium mb-1 mt-4">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1"
        />
        {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}

        {/* Confirm Password */}
        <label className="block text-sm font-medium mb-1 mt-4">Re-enter password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-sm px-2 py-1"
        />
        {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword}</span>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 rounded-full py-2 text-sm font-medium border border-yellow-600 transition mt-6"
        >
          {loading ? "Creating..." : "Continue"}
        </button>

        <div className="text-sm mt-6">
          <p className="text-gray-700">
            Already a customer?{" "}
            <Link to={"/signin"} className="text-blue-600 hover:underline">
              Sign in instead
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
