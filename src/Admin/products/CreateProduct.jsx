import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineTitle, MdOutlinePriceChange, MdOutlineDescription, MdOutlineBrandingWatermark, MdOutlineProductionQuantityLimits, MdCategory, MdOutlineImage } from "react-icons/md";

function CreateProduct() {
  const navigate = useNavigate();
  const { API_BASE_URL, loading, setLoading } = useApp();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    descp: "",
    price: "",
    brand: "",
    quantity: "",
    image: "",
    category_id: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.descp ||
      !formData.price ||
      !formData.brand ||
      !formData.quantity ||
      !formData.image ||
      !formData.category_id
    ) {
      toast.warning("Please fill in all form fields");
      return;
    }

    // Fetch merchant and categories
    useEffect(() => {
      const merchantData = JSON.parse(localStorage.getItem("merchant"));
      if (!merchantData) {
        toast.warning("Merchant not found. Please log in.");
        navigate("/merchant_login");
        return;
      }

      const merchant_id = merchantData.id;

      const fetchCategories = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${API_BASE_URL}/categories`, {
            params: { merchant_id },
          });
          const data = res.data;

          if (data.length === 0) {
            toast.info("No categories found. Please create a category first.");
          } else {
            setCategories(data);
            console.log("Categories:", data);
          }
        } catch (error) {
          console.error("Failed to load categories:", error);
          toast.error("Error fetching categories");
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }, []);

    const product_data = {
      title,
      descp,
      price: parseFloat(price),
      brand,
      quantity: parseInt(quantity),
      images: [image],
      currency: "USD",
      min_qty: 1,
      max_qty: 5,
      discount: 0,
      discount_expiration: "",
      has_refund_policy: false,
      has_discount: false,
      has_shipment: true,
      has_variation: false,
      shipping_locations: ["Nigeria"],
      attrib: [],
      category_id,
      merchant_id,
    };

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/products`, product_data);
      console.log("Product created:", res.data);
      toast.success("Product created successfully");

      setFormData({
        title: "",
        descp: "",
        price: "",
        brand: "",
        quantity: "",
        image: "",
        category_id: "",
      });
    } catch (err) {
        console.log("Error creating product:", err);
        toast.error("Failed to create product.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="account min-h-dvh bg-[#f9f9f9]">
          <div className="account_header text-center py-7">
            <h3 className="font-medium text-3xl">Create Product</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 w-[40%] mx-auto p-6 bg-white rounded-md shadow-md"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title:
              </label>
              <div className="relative">
                <MdOutlineTitle  className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Product title"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                />
              </div>
            </div>

            {/* Descp */}
            <div>
              <label
                htmlFor="descp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description:
              </label>
              <div className="relative">
                <MdOutlineDescription  className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="descp"
                  name="descp"
                  value={formData.descp}
                  onChange={handleChange}
                  placeholder="Product description..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none h-24"
                ></textarea>
              </div>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price:
              </label>
              <div className="relative">
                <MdOutlinePriceChange  className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Product price"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Brand:
              </label>
              <div className="relative">
                <MdOutlineBrandingWatermark  className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Product brand"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <div className="relative">
                <MdOutlineProductionQuantityLimits className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Product quantity"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image:
              </label>
              <div className="relative">
                <MdOutlineImage  className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                />
              </div>
            </div>

            {/* Category_id */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category:
              </label>
              <div className="relative">
                <MdCategory  className="absolute left-3 top-3 text-gray-400" />
                <select
                  type="text"
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-900 outline-none"
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
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
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default CreateProduct;
