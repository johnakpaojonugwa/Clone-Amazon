import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [API_BASE_URL] = useState("http://ecommerce.reworkstaging.name.ng/v2");
  const [merchantUser, setMerchantUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load saved theme + merchant + cart
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const merchantUser = sessionStorage.getItem('merchantUser');
    const storedCart = localStorage.getItem('cartItems');

    setTheme(savedTheme);
    if (merchantUser) setMerchantUser(JSON.parse(merchantUser));
    if (storedCart) setCartItems(JSON.parse(storedCart));

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(savedTheme);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

//APi fetch
const fetchCart = async (userId) => {
  if (!userId) return;

  try {
    setLoading(true);

    // 1. Get cart items
    const res = await axios.get(`${API_BASE_URL}/carts?user_id=${userId}`);
    const cartData = res.data || [];

    // 2. Flatten all products from all cart entries
    const normalizedCart = await Promise.all(
      cartData.flatMap((cart) =>
        cart.products.map(async (productItem) => {
          try {
            const productRes = await axios.get(`${API_BASE_URL}/products/${productItem.id}`);
            const product = productRes.data || {};

            return {
              id: product.id || productItem.id,
              title: product.title || "Unknown Product",
              descp: product.descp || "",
              images: product.images?.[0] || "/placeholder.png",
              quantity: productItem.quantity || 1,
              stock: product.quantity || 1,
              price: Number(productItem.amount.replace(/,/g, "")) || 0, // use cart API amount
            };
          } catch (err) {
            console.log("Failed to fetch product:", productItem.id, err);
            return {
              id: productItem.id,
              title: "Unknown Product",
              descp: "",
              images: "/placeholder.png",
              quantity: productItem.quantity || 1,
              stock: 1,
              price: Number(productItem.amount?.replace(/,/g, "")) || 0,
            };
          }
        })
      )
    );

    setCartItems(normalizedCart.flat());
  } catch (error) {
    console.log("Failed to fetch cart:", error);
    setCartItems([]);
  } finally {
    setLoading(false);
  }
};


  // Add to cart locally
const addToCart = (product) => {
  const price = parseFloat(product.price.toString().replace(/,/g, '')) || 0;

  setCartItems(prev => {
    const existing = prev.find(item => item.id === product.id);
    if (existing) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, price }
          : item
      );
    } else {
      return [...prev, { ...product, quantity: qty, price }];
    }
  });
};

  // Add to cart via API
  const addToCartAPI = async (userId, product) => {
    if (!product?.id) {
      toast.error("Product information is incomplete.");
      return;
    }

    const qty = product.quantity && product.quantity > 0 ? product.quantity : 1;

    const payload = {
      user_id: userId,
      product_id: product.id,
      quantity: qty
    };

    console.log("Add to cart payload:", payload);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/carts`, payload);

      if (res.status === 200 || res.status === 201) {
        setCartItems(prev => {
          const existing = prev.find(item => item.id === product.id);
          if (existing) {
            return prev.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + qty }
                : item
            );
          } else {
            const price = parseFloat(product.price.toString().replace(/,/g, '')) || 0;
            return [...prev, { ...product, qty, price }];
          }
        });

        toast.success("Item added to cart!");
        return res.data;
      } else {
        console.log("Unexpected response:", res);
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.log("Add to cart API error:", error);
      toast.error(
        error.response?.data?.message ||
          "Server error: failed to add item to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  // Decrement item quantity
  const decrement = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  //remove from the API
  const removeFromCartAPI = async (userId, productId) => {
  if (!userId || !productId) return;

  try {
    setLoading(true);
    await axios.delete(`${API_BASE_URL}/carts`, { data: { user_id: userId, product_id: productId } });
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  } catch (error) {
    console.log("Failed to remove from cart:", error);
    toast.error("Failed to remove item from cart");
  } finally {
    setLoading(false);
  }
};


  // Remove item
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * (item.quantity || 0),
    0
  );

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        API_BASE_URL,
        merchantUser,
        setMerchantUser,
        loading,
        setLoading,
        cartItems,
        setCartItems,
        addToCart,
        addToCartAPI,
        decrement,
        removeFromCart,
        removeFromCartAPI,
        clearCart,
        fetchCart,
        totalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);