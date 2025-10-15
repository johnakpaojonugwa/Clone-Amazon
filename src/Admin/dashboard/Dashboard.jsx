import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const { API_BASE_URL, loading, setLoading } = useApp();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCartProducts, setTotalCartProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [merchant, setMerchant] = useState(null);

  useEffect(() => {
    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Please login to access the admin page");
      navigate("/");
      return;
    }
    setMerchant(merchantData);
    const userData = JSON.parse(localStorage.getItem("Account_login")) || {};

    const fetchTotalProducts = async () => {
        try {
          setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/products?merchant_id=${merchantData.id}`
        );
        const data =  res.data;
        const count = data.total ?? (Array.isArray(data) ? data.length : 0);
        setTotalProducts(count);
      } catch (err) {
        console.log("Error fetching total products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTotalUsers = async () => {
        try {
          setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/users`);
        setTotalUsers(res.data.length);
      } catch (err) {
        console.log("Error fetching total users:", err);
    } finally {
        setLoading(false)
    }
    
    };

    const fetchTotalCartProducts = async () => {
      const user_id = userData?.id;
      if (!user_id) {
        // console.log("No user logged in");
        setTotalCartProducts(0);
        return;
      }

      try {
          setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/carts?user_id=${user_id}`);
        const cartItems = res.data.data || res.data || [];
        const totalQuantity = cartItems.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
        setTotalCartProducts(totalQuantity);
      } catch (err) {
        console.log("Error fetching cart count:", err);
        setTotalCartProducts(0);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
        try {
          setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/products?merchant_id=${merchantData.id}`
        );
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setProducts(data);
      } catch (err) {
        console.log("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalProducts();
    fetchTotalUsers();
    fetchTotalCartProducts();
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Summary Cards */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Products</h2>
            <p className="text-2xl font-bold mt-2">{totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold mt-2">{totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Products in Carts</h2>
            <p className="text-2xl font-bold mt-2">{totalCartProducts}</p>
          </div>
        </section>

        {/* Product Table */}
        <header>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b border-gray-200 pb-3">
            Products
          </h2>
        </header>
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length ? (
          <div className="overflow-x-auto px-6 sticky md:top-10 self-start">
            <table className="min-w-full border-collapse border border-gray-200 text-left">
              <thead className="bg-teal-800 text-white">
                <tr>
                  <th className="border border-gray-200 p-3">Title</th>
                  <th className="border border-gray-200 p-3">Image</th>
                  <th className="border border-gray-200 p-3">Price</th>
                  <th className="border border-gray-200 p-3">Brand</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 p-3">
                      {product.title}
                    </td>
                    <td className="border border-gray-200 p-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 object-contain mx-auto rounded-sm"
                      />
                    </td>
                    <td className="border border-gray-200 p-3">
                      {product.price}
                    </td>
                    <td className="border border-gray-200 p-3">
                      {product.brand}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
