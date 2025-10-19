import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { toast } from "react-toastify";
import ProductDetails from "../components/ProductDetails";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { loading, setLoading, API_BASE_URL } = useApp();
  const navigate = useNavigate(); // ✅ FIXED

  // Fetch products on mount
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
        const res = await axios.get(
          `${API_BASE_URL}/products?merchant_id=${merchantData.id}`
        );
        setProducts(res?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching products");
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      {/* Top navigation */}
      <div>
        <nav className="bg-gray-100 gap-5 px-6 leading-8 flex border-b border-gray-400 mb-2 h-9 items-center ">
          {[
            "Today's Deals",
            "Coupons",
            "Renewed Deals",
            "Outlet",
            "Amazon Resale",
            "Grocery Deals",
          ].map((item, i) => (
            <p
              key={i}
              className="text-gray-700 text-xs cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 pt-4"
            >
              {item}
            </p>
          ))}
        </nav>

        <div className="flex flex-wrap gap-2 justify-center items-center">
          <p className="py-3 px-3 m-3 border border-gray-500 text-sm cursor-pointer rounded-[10px]">
            Amazon Devices & Accessories
          </p>
          <p className="py-3 px-3 m-3 border border-gray-500 text-sm cursor-pointer rounded-[10px]">
            Arts, Crafts & Sewing
          </p>
        </div>
      </div>

      {/* Main section */}
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="min-w-45 p-5 border-r">
          <div>
            <h6 className="font-bold mb-2">Department</h6>
            <label className="block text-sm">
              <input type="radio" name="dept" className="mr-2" /> All
            </label>
            <label className="block text-sm">
              <input type="radio" name="dept" className="mr-2" /> Amazon Devices
              & Accessories
            </label>
            <label className="block text-sm">
              <input type="radio" name="dept" className="mr-2" /> Arts, Crafts &
              Sewing
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        {products.length ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto p-5">
            {products.map((product) => (
              <ProductDetails product_detail={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center w-full">
            <h3>No products found</h3>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center border-y border-gray-300 pt-10 pb-5">
        <h2 className="font-bold text-2xl m-1">
          See personalized recommendations
        </h2>
        <Link to="/login">
          <button className="bg-yellow-400 px-6 py-1.5 text-sm hover:bg-yellow-500 cursor-pointer m-1 rounded-[50px]">
            Sign in
          </button>
        </Link>
        <p className="text-xs">
          New customer?{" "}
          <Link
            to="/home/register"
            className="text-blue-500 text-xs underline hover:text-blue-900"
          >
            Start here
          </Link>
        </p>
      </footer>
    </>
  );
};

export default Shop;
