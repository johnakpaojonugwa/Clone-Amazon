import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE_URL, loading, setLoading } = useApp();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Merchant not found. Please log in.");
      navigate("/");
      return;
    }

    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(res?.data || null);
        console.log("Product:", res.data);

      } catch (error) {
        toast.error("Error fetching product details");
        console.log("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [API_BASE_URL, id, navigate, setLoading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h3 className="text-gray-600">Product not found.</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-10 p-10">
      {/* Product Image */}
      <div className="flex-1 flex justify-center items-center bg-white shadow-md rounded-lg p-5">
        <img
          src={product.images || "https://via.placeholder.com/400"}
          alt={product.title}
          className="object-contain w-[90%] h-[400px]"
        />
      </div>

      {/* Product Details */}
      <div className="flex-[1.2] bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {product.title}
          </h2>

          <p className="text-gray-600 text-sm mt-3">
            {product.descp || "No description available."}
          </p>

          <h3 className="text-3xl font-bold text-gray-800 mt-5">
            ${product.price || "0.00"}
          </h3>

          <p className="text-green-600 mt-2 text-sm">
            In stock and ready to ship
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => toast.success("Added to cart")}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full text-sm font-semibold transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => toast.info("Proceeding to checkout")}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full text-sm font-semibold text-white transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
