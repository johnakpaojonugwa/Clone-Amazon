import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { LiaSpinnerSolid } from "react-icons/lia";


const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE_URL, loading, setLoading, addToCartAPI } = useApp();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

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
        const productData = res?.data
          ? { ...res.data, id: res.data.id || res.data.product?.id }
          : null;
        setProduct(productData);
      } catch (error) {
        toast.error("Error fetching product details");
        console.log("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [API_BASE_URL, id, navigate, setLoading]);

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) return toast.warning("Please log in to add to cart.");
    if (!product?.id) return toast.error("Product info incomplete");

    try {
      setLoading(true);
      await addToCartAPI(user.id, {
        ...product,
        quantity,
        has_variation: false,
      });
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

 if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LiaSpinnerSolid size={40} className="animate-spin text-blue-500" />
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
    <>
      <div className="flex justify-center">
        {/* LEFT IMAGE WITH THUMBNAILS */}
        <aside className="w-[35%] m-5 mt-10 flex gap-4">
          {/* Thumbnail list */}
          <div className="flex flex-col gap-3">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-cover rounded-md border cursor-pointer hover:border-blue-500 transition 
          ${selectedImage === img ? "border-blue-500" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* Main image display */}
          <div className="flex-1 ">
            <img
              src={selectedImage || product.images?.[0]}
              alt={product.title}
              className="object-contain w-[90%] h-[600px] rounded-md border border-gray-200"
            />
          </div>
        </aside>

        {/* MIDDLE DETAILS */}
        <div className="w-[31%] m-5">
          <p className="text-2xl font-[500]">{product.title}</p>
          <br />
          <span>4.4</span>
          <span className="text-blue-800 text-sm hover:text-900 hover:underline cursor-pointer ml-5">
            63,866 ratings
          </span>
          <p className="text-sm bg-black text-white rounded-[5px] w-30 text-center my-1">
            Amazon's Choice
          </p>
          <p className="text-sm">
            <strong>10K+ bought</strong> in past month
          </p>
          <hr className="text-gray-400 my-2" />
          <p className="text-sm bg-red-700 text-white rounded-[5px] w-32 p-1 my-2 text-center">
            Limited time deal
          </p>
          <span className="text-red-500 text-2xl">-20%</span>
          <span className="text-xs align-top pt-3">NGN</span>
          <span className="text-3xl font-[600]">{product.price}</span>
          <span className="text-xs align-top pt-3">76</span>
          <div className="flex">
            <p className="text-sm text-gray-700 my-1">
              List Price:
              <span className="line-through px-1">NGN {product.price}</span>
            </p>
          </div>
          <p className="text-sm">
            NGN {product.price} Shipping & Import Fees Deposit to Nigeria{" "}
            <span className="text-blue-500 hover:text-blue-900 cursor-pointer text-sm">
              Details
            </span>
          </p>
          <p className="text-sm font-bold">Sales taxes may apply at checkout</p>

          {/* COUPON */}
          <button className="bg-orange-400 font-bold px-2 py-0.5 text-sm mr-1 rounded-[5px]">
            Coupon:
          </button>
          <input type="checkbox" />
          <span className="text-green-700">Apply NGN 7,325.35 coupon</span>

          {/* SIZE & COLOR */}
          <div className="flex items-center">
            <p>Color:</p>
            <strong className="text-sm">Original White</strong>
          </div>
          <p className="text-sm">
            Size: <strong>Queen</strong>
          </p>
          <div className="flex gap-2 items-center m-1">
            <p className="p-2 border border-gray-500 text-sm cursor-pointer rounded-[10px] hover:border-blue-500 active:outline outline-blue-900">
              Queen
            </p>
            <p className="p-2 border border-gray-500 text-sm cursor-pointer rounded-[10px] hover:border-blue-500 active:outline outline-blue-900">
              King
            </p>
          </div>

          <strong className="text-sm">Bundles with this item</strong>
          <p className="text-blue-600 text-sm hover:text-blue-900 hover:underline cursor-pointer">
            See all bundles
          </p>

          {/* BRAND */}
          <hr className="text-gray-400 my-2" />
          <div className="flex text-sm gap-6.5 my-1">
            <strong>Brand</strong>
            <p>{product.brand}</p>
          </div>

          {/* ABOUT THIS ITEM */}
          <hr className="text-gray-400 my-2" />
          <div>
            <h2 className="text-xl font-bold">About this item</h2>
            <ul className="text-sm list-disc list-inside">
              <li className="m-1">{product.descp}</li>
            </ul>
            <p className="text-blue-600 text-sm hover:text-blue-900 hover:underline cursor-pointer">
              Report an issue with this product or seller
            </p>
            <hr className="text-gray-400 my-2" />
          </div>

          <p className="text-xs text-gray-500">Sponsored</p>
        </div>

        {/* RIGHT CHECKOUT BOX */}
        <div className="w-[250px] mx-3">
          <div className="border border-gray-300 p-5 my-2">
            <div className="pb-3">
              <span className="text-xs align-top pt-3">NGN</span>
              <span className="text-3xl font-[600] mb-66">{product.price}</span>
              <span className="text-xs align-top pt-3">76</span>
            </div>
            <p className="text-gray-700 my-1 text-sm">
              NGN 126,054.62 Shipping & Import Fees Deposit to Nigeria{" "}
              <span className="text-blue-600 cursor-pointer hover:text-blue-900">
                Details
              </span>
            </p>
            <p className="px-5 my-1 text-sm">
              Sales taxes may apply at checkout
            </p>
            <p className="my-1 text-sm">
              Delivery <strong>Thursday, November 6</strong>
            </p>
            <p className="my-1 text-sm">
              Or fastest delivery <strong>Friday, October 24</strong>. Order
              within <span className="text-green-500">18 hrs 18 mins</span>
            </p>
            <p className="text-gray-700 my-1 text-xs">
              <span className="text-blue-600 cursor-pointer hover:text-blue-900">
                Deliver to Nigeria
              </span>
            </p>

            <p className="text-green-500 text-xl my-2">In Stock</p>

            {/* QUANTITY */}
            <div className="border rounded-[5px] px-2 border-gray-300 bg-gray-100 hover:bg-gray-200 py-1.5 cursor-pointer text-sm font-bold my-1">
              <span>Quantity:</span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-31 outline-none"
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            {/* ADD TO CART / BUY NOW */}
            <Link to="/home/cart">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="bg-yellow-400 w-full py-1.5 text-sm hover:bg-yellow-500 cursor-pointer my-2 rounded-[50px]"
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </Link>
            <Link to="/home">
              <button className="bg-orange-400 w-full py-1.5 text-sm hover:bg-orange-500 cursor-pointer rounded-[50px] mb-3">
                Buy now
              </button>
            </Link>

            {/* ADDITIONAL INFO */}
            <div className="flex text-xs gap-3 my-1">
              <p className="text-gray-500">Ships from</p>
              <p>Amazon</p>
            </div>
            <div className="flex text-xs gap-7.5 my-1">
              <p className="text-gray-500">Sold by</p>
              <p className="text-blue-700 hover:text-blue-900 hover:underline cursor-pointer">
                Coop Sleep Goods
              </p>
            </div>
            <div className="flex text-xs gap-7.5 my-1">
              <p className="text-gray-500">Returns</p>
              <p className="text-blue-700 hover:text-blue-900 cursor-pointer">
                30-day refund / replacement
              </p>
            </div>
            <div className="flex text-xs gap-5.5 my-1">
              <p className="text-gray-500">Payment</p>
              <p className="text-blue-700 hover:text-blue-900 cursor-pointer">
                Secure transaction
              </p>
            </div>

            <p className="text-blue-700 text-xs hover:text-blue-900 hover:underline cursor-pointer">
              See more
            </p>

            <input type="checkbox" />
            <span className="text-sm">Add a gift receipt for easy returns</span>
            <hr className="text-gray-400 my-2" />
            <div className="border rounded-[8px] px-3 border-gray-500 bg-gray-100 hover:bg-white py-1.5 cursor-pointer text-sm mt-3">
              <span>Add to List</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-right">Sponsored</p>
        </div>
      </div>
      <hr className="text-gray-400 my-2" />
    </>
  );
};

export default Product;
