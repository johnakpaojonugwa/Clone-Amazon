import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { toast } from "react-toastify";
import ProductDetails from "../components/ProductDetails";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { loading, setLoading, API_BASE_URL } = useApp();
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // slide function
  const slide = (direction) => {
    const container = sliderRef.current;
    const itemWidth = container.firstChild?.offsetWidth || 250;
    const scrollDistance = itemWidth * 3; // move 3 cards per click
    container.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  };

  // Fetch products
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
      <div className="flex justify-center items-center py-20">
        <LiaSpinnerSolid size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  const categories = [
    "Featured Deals",
    "Lightning Deals",
    "Customers' Most-Loved",
    "Fall Favorites",
    "Halloween",
    "Outlet",
    "Beauty",
    "Fashion",
    "Home",
    "Toys & Games",
    "Electronics",
    "Devices",
    "Kitchen",
    "Everyday Essentials",
    "Amazon Brands",
  ];

  return (
    <>
      {/* 🔹 Top Nav */}
      <nav className="bg-gray-100 flex flex-wrap gap-3 px-4 md:px-6 border-b border-gray-400 items-center justify-center md:justify-start h-auto py-2">
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
            className="text-gray-700 text-xs sm:text-sm cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 pt-1"
          >
            {item}
          </p>
        ))}
      </nav>
      {/* 🔹 Category slider */}
      <div className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between gap-2 p-2 relative">
        {/* Left Button */}
        <button
          onClick={() => slide("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 z-10 flex items-center justify-center h-10 w-10"
        >
          <FaAngleLeft size={20} className="text-gray-500" />
        </button>

        {/* sliding Categories */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-scroll scroll-smooth no-scrollbar px-12"
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white border border-gray-300 rounded-xl px-5 py-3 
                       text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 
                       whitespace-nowrap transition-all duration-200"
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => slide("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 z-10 flex items-center justify-center h-10 w-10"
        >
          <FaAngleRight size={20} className="text-gray-500" />
        </button>
      </div>
      {/* 🔹 Main Content */}
      <div className="min-h-screen flex flex-col md:flex-row w-[95%] md:w-[80%] mx-auto mt-5">
        {/* Sidebar */}
        <aside className="md:w-1/4 lg:w-1/5 border-b md:border-b-0 p-4 mb-4 md:mb-0">
          <div className="mb-6">
            <h6 className="font-bold mb-2">Department</h6>
            {[
              "All",
              "Amazon Devices & Accessories",
              "Arts, Crafts & Sewing",
              "Appliances",
              "Automotive",
              "Baby products",
            ].map((dept, i) => (
              <label key={i} className="block text-sm mb-1">
                <input type="radio" name="dept" className="mr-2" /> {dept}
              </label>
            ))}
            <p className="text-sm text-blue-500 cursor-pointer mt-1">
              See more
            </p>
          </div>

          <div>
            <h6 className="font-bold mb-2">Brands</h6>
            {["Bissell", "Coop Home Goods", "Amazon", "ROVE"].map(
              (brand, i) => (
                <label key={i} className="block text-sm mb-1">
                  <input type="checkbox" className="mr-2" />
                  {brand}
                </label>
              )
            )}
            <p className="text-sm text-blue-500 cursor-pointer mt-1">
              See more
            </p>
          </div>

          <div>
            <h6 className="font-bold mb-2 mt-6">Customer Reviews</h6>
            {["All", "⭐⭐⭐⭐ & up"].map(
              (review, i) => (
                <label key={i} className="block text-sm mb-1">
                  <input type="radio" name="review" className="mr-2" />
                  {review}
                </label>
              )
            )}
          </div>

          <div>
            <h6 className="font-bold mb-2 mt-6">Discount</h6>
            <label htmlFor="discount" className="block text-sm mb-1 font-bold">10% - 90%</label>
            <input type="range" name="discount" className="mr-2 cursor-grab" />
          </div>

          <div>
            <h6 className="font-bold mb-2 mt-6">Prime Programs</h6>
            {["Prime Exclusive", "Prime Early Access"].map(
              (prime, i) => (
                <label key={i} className="block text-sm mb-1">
                  <input type="checkbox" name="prime" className="mr-2" />
                  {prime}
                </label>
              )
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          {products.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
              {products.map((product) => (
                <ProductDetails product_detail={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center w-full">
              <h3>No products found</h3>
            </div>
          )}
        </section>
      </div>
      {/* 🔹 Footer */}
      <footer className="text-center border-t border-gray-300 mt-10 pt-10 pb-5 px-2">
        <h2 className="font-bold text-xl sm:text-2xl mb-3">
          See personalized recommendations
        </h2>
        <Link to="/home/signin">
          <button className="bg-yellow-400 px-6 py-1.5 text-sm hover:bg-yellow-500 cursor-pointer m-1 rounded-[50px]">
            Sign in
          </button>
        </Link>
        <p className="text-xs mt-2">
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
