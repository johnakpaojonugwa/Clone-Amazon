import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MdCategory } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";

function Category() {
  const navigate = useNavigate();
  const { API_BASE_URL, loading, setLoading } = useApp();

  const [formData, setFormData] = useState({
    category_name: "",
    category_image: "",
  });

  // Handle input change dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.category_name ||
      !formData.category_image
    ) {
      toast.warning("Please fill in all form fields");
      return;
    }

    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Please login to access the admin page");
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/categories`, formData);

      if (res.data && res.data.id) {
        toast.success("Category created successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Failed to create category. Try again.");
      }

      // Clear form
      setFormData({
        category_name: "",
        category_image: "",
      });
    } catch (err) {
      console.log("Error creating category:", err);
      toast.error("An error occurred while creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="account min-h-dvh bg-[#f9f9f9]">
          <div className="account_header text-center py-7">
            <h3 className="font-medium text-3xl">Create Category</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 w-[40%] mx-auto p-6 bg-white rounded-md shadow-md">
            {/* Category name */}
            <div>
              <label htmlFor="category_name" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name:
              </label>
              <div className="relative">
                <MdCategory  className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  id="category_name"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                />
              </div>
            </div>

            {/* Category image */}
            <div>
              <label htmlFor="category_image" className="block text-sm font-medium text-gray-700 mb-1">
                Category Image:
              </label>
              <div className="relative">
                <FaRegImage className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  id="category_image"
                  name="category_image"
                  value={formData.category_image}
                  onChange={handleChange}
                  placeholder="Enter your image URL"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              type="submit"
              className={`mt-4 w-full text-center text-sm text-white py-2 rounded-md transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-800 hover:bg-teal-600"
              }`}
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Category;
