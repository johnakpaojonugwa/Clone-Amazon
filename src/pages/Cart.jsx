import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Example fetch — replace with your actual API endpoint
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://ecommerce.reworkstaging.name.ng/v2/cart");
        setCartItems(response.data.data || []);
      } catch (error) {
        console.error("❌ Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          <hr className="mb-4" />

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain mx-auto md:mx-0"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.description || "No description available."}
                  </p>

                  <p className="text-sm mt-1 text-red-600">
                    Only {item.stock || 1} left in stock — order soon.
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button className="px-2 py-1 border rounded">-</button>
                    <span>{item.quantity || 1}</span>
                    <button className="px-2 py-1 border rounded">+</button>
                    <button className="text-blue-500 ml-4">Delete</button>
                    <button className="text-blue-500">Save for later</button>
                  </div>
                </div>

                <div className="text-right text-lg font-semibold">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="text-right mt-4 text-lg font-semibold">
              Subtotal ({cartItems.length} item
              {cartItems.length > 1 ? "s" : ""}):{" "}
              <span className="text-xl">${subtotal.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — CHECKOUT BOX */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm h-fit">
          <h3 className="text-lg font-medium">
            Subtotal ({cartItems.length} item
            {cartItems.length > 1 ? "s" : ""}):{" "}
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </h3>

          <label className="flex items-center gap-2 mt-2 text-sm">
            <input type="checkbox" />
            This order contains a gift
          </label>

          <button className="bg-yellow-400 hover:bg-yellow-500 w-full rounded-full py-2 mt-4 border border-yellow-600 font-medium">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
