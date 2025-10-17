// import { useEffect, useState } from "react";
// import axios from "axios";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   // Example fetch — replace with your actual API endpoint
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://ecommerce.reworkstaging.name.ng/v2/cart");
//         setCartItems(response.data.data || []);
//       } catch (error) {
//         console.error("❌ Failed to fetch cart:", error);
//       }
//     };

//     fetchCart();
//   }, []);

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
//         <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
//           <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//           <hr className="mb-4" />

//           {cartItems.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             cartItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-200"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-32 h-32 object-contain mx-auto md:mx-0"
//                 />

//                 <div className="flex-1">
//                   <h3 className="text-lg font-medium">{item.name}</h3>
//                   <p className="text-sm text-gray-600">
//                     {item.description || "No description available."}
//                   </p>

//                   <p className="text-sm mt-1 text-red-600">
//                     Only {item.stock || 1} left in stock — order soon.
//                   </p>

//                   <div className="flex items-center gap-2 mt-3">
//                     <button className="px-2 py-1 border rounded">-</button>
//                     <span>{item.quantity || 1}</span>
//                     <button className="px-2 py-1 border rounded">+</button>
//                     <button className="text-blue-500 ml-4">Delete</button>
//                     <button className="text-blue-500">Save for later</button>
//                   </div>
//                 </div>

//                 <div className="text-right text-lg font-semibold">
//                   ${item.price.toFixed(2)}
//                 </div>
//               </div>
//             ))
//           )}

//           {cartItems.length > 0 && (
//             <div className="text-right mt-4 text-lg font-semibold">
//               Subtotal ({cartItems.length} item
//               {cartItems.length > 1 ? "s" : ""}):{" "}
//               <span className="text-xl">${subtotal.toFixed(2)}</span>
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE — CHECKOUT BOX */}
//         <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow-sm h-fit">
//           <h3 className="text-lg font-medium">
//             Subtotal ({cartItems.length} item
//             {cartItems.length > 1 ? "s" : ""}):{" "}
//             <span className="font-semibold">${subtotal.toFixed(2)}</span>
//           </h3>

//           <label className="flex items-center gap-2 mt-2 text-sm">
//             <input type="checkbox" />
//             This order contains a gift
//           </label>

//           <button className="bg-yellow-400 hover:bg-yellow-500 w-full rounded-full py-2 mt-4 border border-yellow-600 font-medium">
//             Proceed to checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;

// import { Row, Col, Card, List, Button, Typography, Divider, InputNumber } from "antd";
// import { Link } from "react-router-dom";

// const { Title, Text } = Typography;

// const CartPage = () => {
//   // Sample product (this will come from your API)
//   const cartItems = [
//     {
//       id: 1,
//       name: "Alienware 16 Aurora Gaming Laptop AC16250-16\" WQXGA 120Hz Display",
//       price: 1240,
//       details: "Intel Core i7-240H | 16GB DDR5 RAM | 1TB SSD | RTX 4070",
//       image: "https://m.media-amazon.com/images/I/71lLyGNv7nL._AC_AA180_.jpg", // replace with API image URL
//       quantity: 1,
//     },
//   ];

//   return (
//     <div style={{ background: "#fff", padding: "20px 50px", minHeight: "100vh" }}>
//       <Title level={2}>Shopping Cart</Title>
//       <Row gutter={[32, 32]}>
//         {/* Left: Cart Items */}
//         <Col xs={24} md={16}>
//           <List
//             itemLayout="horizontal"
//             dataSource={cartItems}
//             renderItem={(item) => (
//               <Card style={{ marginBottom: 20, borderRadius: 8 }}>
//                 <Row gutter={16} align="middle">
//                   <Col xs={24} md={6}>
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       style={{ width: "100%", borderRadius: 8 }}
//                     />
//                   </Col>
//                   <Col xs={24} md={18}>
//                     <Title level={5}>{item.name}</Title>
//                     <Text type="secondary">{item.details}</Text>
//                     <Divider />
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Button>-</Button>
//                         <InputNumber min={1} max={10} value={item.quantity} />
//                         <Button>+</Button>
//                         <Button type="link" danger>
//                           Delete
//                         </Button>
//                       </div>
//                       <Title level={4} style={{ color: "#000" }}>
//                         ${item.price.toFixed(2)}
//                       </Title>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card>
//             )}
//           />
//           <div style={{ textAlign: "right", marginTop: 10 }}>
//             <Text strong>
//               Subtotal ({cartItems.length} item): $
//               {cartItems.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}
//             </Text>
//           </div>
//         </Col>

//         {/* Right: Summary */}
//         <Col xs={24} md={8}>
//           <Card bordered style={{ borderRadius: 8 }}>
//             <Text strong>
//               Subtotal ({cartItems.length} item): $
//               {cartItems.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}
//             </Text>
//             <div style={{ margin: "10px 0" }}>
//               <input type="checkbox" />{" "}
//               <Text>This order contains a gift</Text>
//             </div>
//             <Button
//               type="primary"
//               block
//               style={{
//                 backgroundColor: "#ffd814",
//                 borderColor: "#fcd200",
//                 color: "#111",
//                 fontWeight: 500,
//               }}
//             >
//               Proceed to checkout
//             </Button>
//           </Card>

//           <Card bordered style={{ marginTop: 20, borderRadius: 8 }}>
//             <Title level={5}>Featured items you may like</Title>
//             <List
//               dataSource={[
//                 { name: "Amazon Basics Monitor 75Hz", price: 105.26 },
//                 { name: "MSI Katana 15 HX 165Hz Gaming Laptop", price: 1640.9 },
//               ]}
//               renderItem={(item) => (
//                 <List.Item
//                   actions={[<Button type="link">Add to cart</Button>]}
//                 >
//                   <Text>{item.name}</Text>
//                   <Text>${item.price.toFixed(2)}</Text>
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default CartPage;


import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🟢 Fetch cart items
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/carts?user_id=${userId}`);
      setCartItems(response.data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  // 🟡 Update quantity
  const updateQuantity = async (item, action) => {
    const newQty = action === "increase" ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) return;

    try {
      await axios.post(`${baseURL}/carts`, {
        user_id: userId,
        product_id: item.product_id,
        has_variation: false,
        quantity: newQty,
      });
      fetchCart(); // refresh UI
    } catch (error) {
      console.error("❌ Failed to update quantity:", error);
    }
  };

  // 🔴 Delete item
  const deleteItem = async (item) => {
    try {
      await axios.delete(`${baseURL}/carts`, {
        data: {
          user_id: userId,
          product_id: item.product_id,
        },
      });
      fetchCart();
    } catch (error) {
      console.error("❌ Failed to delete cart item:", error);
    }
  };

  // 🟢 Checkout cart
  const handleCheckout = async () => {
    try {
      await axios.post(`${baseURL}/carts/checkout`, { user_id: userId });
      alert("✅ Checkout successful!");
      setCartItems([]);
    } catch (error) {
      console.error("❌ Checkout failed:", error);
    }
  };

  // subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
            <p>Your cart is empty.</p>
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
                  ${(item.price * item.quantity).toFixed(2)}
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

        {/* RIGHT — CHECKOUT BOX */}
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

export default Cart;
