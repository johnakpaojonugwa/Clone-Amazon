import axios from "axios";
import { toast } from "react-toastify";
import { useApp } from "../../context/AppContext";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";


function CartAdmin() {
  const {
    API_BASE_URL,
    loading,
    setLoading,
    cartItems,
    addToCart,
    decrement,
    totalPrice,
    fetchCart,
    removeFromCartAPI,
  } = useApp();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) fetchCart(userId);
  }, [userId]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/carts/checkout`, { user_id: userId });
      toast.success("Checkout successful!");
      fetchCart(userId);
    } catch (error) {
      toast.error("Checkout failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
            <h1>Your cart is empty.</h1>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-200"
              >
                <img
                  src={item.images || "/placeholder.png"}
                  alt={item.title}
                  className="w-32 h-32 object-contain mx-auto md:mx-0"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.title.slice(0, 50)}...</h3>
                  <p className="text-sm text-gray-600">{item.descp.slice(0, 150)}...</p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => decrement(item.id)}
                      className="px-2 py-1 border rounded cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-2 py-1 border rounded cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCartAPI(userId, item.id)}
                      className="text-red-500 ml-4 cursor-pointer"
                    >
                      <FaTimes size={40} />
                    </button>
                  </div>
                </div>

                <div className="text-right text-lg font-semibold">
                  ₦{item.price.toLocaleString()}
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="text-right mt-4 text-lg font-semibold">
              Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}
              ): <span className="text-xl">₦{totalPrice.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* RIGHT — CHECKOUT BOX */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm h-fit">
          <h3 className="text-lg font-medium">
            Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}):{" "}
            <span className="font-semibold">
              ₦{totalPrice.toLocaleString()}
            </span>
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
