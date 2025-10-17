import { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";

function CartAdmin() {
  const { API_BASE_URL, loading, setLoading } = useApp();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/carts?user_id=${userId}`
      );
      setCartItems(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch cart");
      console.log("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  // Update quantity
  const updateQuantity = async (item, action) => {
    const newQty =
      action === "increase" ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) return;

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/carts`, {
        user_id: userId,
        product_id: item.product_id,
        has_variation: false,
        quantity: newQty,
      });
      fetchCart();
    } catch (error) {
      console.log("Failed to update quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (item) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/carts`, {
        data: {
          user_id: userId,
          product_id: item.product_id,
        },
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    } finally {
      setLoading(false);
    }
  };

  // Checkout cart
  const handleCheckout = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/carts/checkout`, { user_id: userId });
      alert("✅ Checkout successful!");
      setCartItems([]);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* LEFT — CART ITEMS */}
        <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          <hr className="mb-4" />

          {loading ? (
            <p>Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <h1 className="">
              Your cart is empty.
            </h1>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-200"
              >
                <img
                  src={item.product?.image || "/placeholder.png"}
                  alt={item.product?.name || "Product"}
                  className="w-32 h-32 object-contain mx-auto md:mx-0"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.product?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.product?.description || "No description available."}
                  </p>

                  <p className="text-sm mt-1 text-red-600">
                    Only {item.stock || 1} left in stock — order soon.
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item, "decrease")}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, "increase")}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => deleteItem(item)}
                      className="text-blue-500 ml-4"
                    >
                      Delete
                    </button>
                    <button className="text-blue-500">Save for later</button>
                  </div>
                </div>

                <div className="text-right text-lg font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="text-right mt-4 text-lg font-semibold">
              Subtotal ({cartItems.length} item
              {cartItems.length > 1 ? "s" : ""}):{" "}
              <span className="text-xl">₦{subtotal.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* RIGHT — CHECKOUT BOX */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm h-fit">
          <h3 className="text-lg font-medium">
            Subtotal ({cartItems.length} item
            {cartItems.length > 1 ? "s" : ""}):{" "}
            <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
          </h3>

          <label className="flex items-center gap-2 mt-2 text-sm">
            <input type="checkbox" />
            This order contains a gift
          </label>

          <button
            onClick={handleCheckout}
            className="bg-yellow-400 hover:bg-yellow-500 w-full rounded-full py-2 mt-4 border border-yellow-600 font-medium"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartAdmin;
