import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";

// import ProductDetails from "./ProductDetails";

const Product = () => {
  const { API_BASE_URL, loading, setLoading } = useApp();
  const [products, setProducts] = useState([]);
  const { id } = useParams();

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

 if (!products) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h3 className="text-gray-600">Product not found.</h3>
      </div>
    );
  }

  return (
    <>
      <nav className="flex h-20 items-center border-y border-gray-500 pl-10 gap-5">
        <p className="font-bold">Personalize Your Perfect Sleep</p>
        <img src={products.images} alt={products.title} className="" />
        <div>
          <img src={products.images} alt={products.title} className="" />
          <img src={products.images} alt={products.title} className="" />
          <img src={products.images} alt={products.title} className="" />
        </div>
        <img
          alt="coop"
          src="https://aax-us-east-retail-direct.amazon.com/x/c/RBwecq83j10xIYJ9fgEm7ZIAAAGZ6BHAegEAAAH0AQBvbm9fdHhuX2JpZDIgICBvbm9fdHhuX2ltcDIgICDQv_x-/clv1_CEuOPUxokZA2iHrVXrwS7xiNWy1gCoAqraotrRHP-ONP8X9VgVnwC_018nFItlO9gqEp25IbkHjNfU3_A3teLRVyLTOcLvrPPkECYBg0YmCrAIVzxYgc6JJGZxCbp2E83kdEFGc-d2L-tbEL07hou9gH9SQXe5N0DEMiWakxHguF0vWLjRIgRVf6aJasOvMmX21ZeoeB2JkETn0sPcQSaPQXlo3x1dAkCgvWOegj0wpty59lgbmiQg8wnUS0gVlNCTjmOPjK5VMm_R1dFu1HVBmuYHSo1ieLBdqW_q7zCrMkI0mlzuS-xTxJFHYLduzRo9gX0fFHZPzXhZbGAjvaY6Uev7sc6Bg6c_Eei2IZygsudQ/https://www.amazon.com/stores/page/0298442F-F004-4004-80CF-59AC01E76F36"
          className=""
        />
      </nav>
      <p className="text-xs text-gray-500 text-right">Sponsored</p>
      <div>
        <span className="text-gray-500 text-xs hover:underline cursor-pointer">
          Home & Kitchen {`>`}
        </span>
        <span className="text-gray-500 text-xs hover:underline cursor-pointer">
          Bedding {`>`}
        </span>
        <span className="text-gray-500 text-xs hover:underline cursor-pointer">
          Bed Pillows & Positioners {`>`}
        </span>
        <span className="text-gray-500 text-xs hover:underline cursor-pointer">
          Bed Pillows
        </span>
      </div>

      <div className="flex justify-center">
        <aside className="w-[35%] m-5">
          <img src={products.images} alt={products.title} className="" />
        </aside>
        <div className="w-[31%] m-5">
          <p className="text-2xl font-[500]">
            {products.description}
            Coop Home Goods Original Adjustable Pillow, Queen Size Bed Pillows
            for Sleeping, Cross Cut Memory Foam Pillows - Medium Firm Back,
            Stomach and Side Sleeper Pillow, CertiPUR-US/GREENGUARD Gold
          </p>
          <p className="text-blue-800 text-sm hover:text-900 hover:underline cursor-pointer">
            Visit the Coop Home Goods Store
          </p>
          <br />
          <span>4.4</span>
          <span className="text-blue-800 text-sm hover:text-900 hover:underline cursor-pointer ml-5">
            63,866 ratings
          </span>
          <p className="text-sm bg-black text-white rounded-[5px] w-30 text-center my-1">
            Amazon's Choice
          </p>
          <p className="text-sm ">
            <strong className="">10K+ bought</strong> in past month
          </p>
          <hr className="text-gray-400 my-2" />
          <p className="text-sm bg-red-700 text-white rounded-[5px] w-32 p-1 my-2 text-center">
            Limited time deal
          </p>
          <span className="text-red-500 text-2xl">-20%</span>
          <span className="text-xs align-top pt-3">NGN</span>
          <span className="text-3xl font-[600]">99,624</span>
          <span className="text-xs align-top pt-3">76</span>
          <div className="flex">
            <p className="text-sm text-gray-700 my-1">
              List Pice:<span className="line-through px-1">NGN123,530.95</span>
            </p>
          </div>
          <p className="text-sm">
            NGN 126,054.62 Shipping & Import Fees Deposit to Nigeria{" "}
            <span className="text-blue-500 hover:text-blue-900 cursor-pointer text-sm">
              Details
            </span>
          </p>
          <p className="text-sm font-bold">Sales taxes may apply at checkout</p>
          <button className="bg-orange-400 font-bold px-2 py-0.5 text-sm mr-1 rounded-[5px]">
            Coupon:
          </button>
          <input type="checkbox" />
          <span className="text-green-700">Apply NGN 7,325.35 coupon</span>
          <span className="text-blue-600 text-sm">
            Shop items {`>`} | <span className="underline text-sm">Terms</span>
          </span>
          <div className="flex items-center">
            <p>Color:</p>
            <strong className="text-sm">Original White</strong>
          </div>
          <div className="flex">
            <img src={products.images} alt={products.title} className="" />
            <img src={products.images} alt={products.title} className="" />
            <img src={products.images} alt={products.title} className="" />
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
          <img src={products.images} alt={products.title} className="" />
          <p className="text-blue-600 text-sm hover:text-blue-900 hover:underline cursor-pointer">
            See all bundles
          </p>
          <hr className="text-gray-400 my-2" />
          <div className="flex text-sm gap-3">
            <strong>Fill Material</strong>
            <p>
              Cross-Cut Memory Foam & Microfiber Blend (76% Visco Polyurethane
              Foam, 24% Polyester Gel Fiber){" "}
            </p>
          </div>
          <div className="flex text-sm gap-6.5 my-1">
            <strong>
              Pillow <br /> Type
            </strong>
            <p>Bed Pillow</p>
          </div>
          <div className="flex text-sm gap-8 my-1">
            <strong>Color</strong>
            <p>Original White</p>
          </div>
          <div className="flex text-sm gap-10 my-1">
            <strong>Size</strong>
            <p>Queen</p>
          </div>
          <div className="flex text-sm gap-6.5 my-1">
            <strong>Brand</strong>
            <p>Coop Home Goods</p>
          </div>
          <hr className="text-gray-400 my-2" />
          <div className="">
            <h2 className="text-xl font-bold">About this item</h2>
            <ul className="text-sm list-disc list-inside">
              <li className="m-1">
                Fully Adjustable to Your Comfort: Coop’s Original Pillow is
                fully adjustable. Simply add or remove memory foam fill to
                achieve your desired firmness—remove fill for a softer feel or
                add more for a firmer one. Keep in mind that cooler environments
                may cause the foam to feel firmer, so adjust accordingly.
                Whether you’re a back, side, or stomach sleeper, you can create
                the perfect pillow for your sleep style to experience ultimate
                comfort and support.
              </li>
              <li className="m-1">
                Premium Materials for Ultimate Comfort: The Coop Original Pillow
                is the best pillow for sleeping, featuring our signature Lulltra
                fabric cover—with its ultra-soft texture and breathable fabric,
                it's perfectly designed for a cozy, luxurious sleep. Inside,
                it's filled with our proprietary Oomph fill, a perfect blend of
                cross-cut memory foam and microfiber for plush, adaptive
                support.
              </li>
              <li className="m-1">
                Fresh, New Foam Every Time: We use only freshly manufactured
                memory foam, never repurposed or recycled, ensuring the highest
                quality and performance with every pillow for a consistently
                comfortable sleep experience.
              </li>
              <li className="m-1">
                Extra Fill Included for Custom Comfort: Every Coop pillow comes
                with an extra fill bag of Oomph fill, giving you even more
                flexibility to customize the pillow’s loft and firmness. Whether
                you like a fluffy pillow or a smooth pillow, Coop pillows adjust
                to match your unique sleeping preference and keep you aligned
                and comfortable.
              </li>
              <li className="m-1">
                We care! Certified Safe and Clean: Rest easy knowing the Coop
                Original Pillow is CertiPUR-US and GREENGUARD Gold certified,
                meaning it’s been rigorously tested to ensure it meets strict
                safety and environmental standards, to ensure safety and
                quality. No harmful chemicals are every used in any Coop
                product!
              </li>
            </ul>
            <p className="text-blue-600 text-sm hover:text-blue-900 hover:underline cursor-pointer">
              Report an issue with this product or seller
            </p>
            <hr className="text-gray-400 my-2" />
          </div>
          <h2 className="text-xl font-bold">Competitively priced item</h2>
          <div className="flex">
            <img src={products.images} alt={products.title} className="" />
            <div>
              <p className="text-blue-700 text-sm hover:text-blue-900 hover:underline cursor-pointer">
                Amazon Basics Down Alternative Bed Pillows, Medium Density For
                Back and Side Sleepers, King, 2-Pack, White, 36 in L x 20 in W
              </p>
              <p className="text-blue-700 text-sm">(37591)</p>
              <p className="text-sm">NGN42,179.37</p>
              <p className="text-sm text-gray-700">(NGN 21,097.01/count)</p>
              <p className="text-sm">4 sustainability features</p>
            </div>
          </div>
          <hr className="text-gray-400 my-2" />
          <div className="flex border border-gray-400 my-1 rounded-[8px] bg-gray-100">
            <img src={products.images} alt={products.title} className="" />
            <div className="text-sm">
              <p className=" my-1">
                Coop Home Goods Eden Bed Pillow Queen Size for Sleeping on Back,
                Stommach and side...
              </p>
              <p className="text-gray-700 my-1">NGN 106,211.51</p>
              <p>NGN 53,105.76/coupon</p>
              <p className="text-blue-500 font-bold">prime</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Sponsored</p>
        </div>
        <div className="w-[250px] mx-3">
          <div className="border border-gray-300 p-5 my-2">
            <div className="pb-3">
              <span className="text-xs align-top pt-3">NGN</span>
              <span className="text-3xl font-[600] mb-66">99,624</span>
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
              Or fastest delivery <strong>Friday, October 24.</strong>Order
              within <span className="text-green-500">18 hrs 18 mins</span>
            </p>
            <p className="text-gray-700 my-1 text-xs">
              <span className="text-blue-600 cursor-pointer hover:text-blue-900">
                Deliver to Nigeria
              </span>
            </p>
            <p className="text-green-500 text-xl my-2">In Stock</p>
            <div className="border rounded-[5px] px-2 border-gray-300 bg-gray-100 hover:bg-gray-200 py-1.5 cursor-pointer text-sm font-bold my-1">
              <span>Quantity:</span>
              <select className="w-31 outline-none">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <Link to="/cart">
              <button className="bg-yellow-400 w-full py-1.5 text-sm hover:bg-yellow-500 cursor-pointer my-2 rounded-[50px]">
                Add to Cart
              </button>
            </Link>
            <Link to="/">
              <button className="bg-orange-400 w-full py-1.5 text-sm hover:bg-orange-500 cursor-pointer rounded-[50px] mb-3">
                Buy now
              </button>
            </Link>
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
          <div className="border border-gray-300 p-3 my-2">
            <img src={products.images} alt={products.title} className="" />
            <div className="text-sm">
              <p className=" my-1">Coop Home Goods Essence Dow...</p>
              <span className="text-sm">4.3</span>
              <span className="text-xs text-gray">14,290</span>
              <br />
              <span className="text-xs align-top pt-3">NGN</span>
              <span className="text-xl font-[600] mb-66">106,349</span>
              <span className="text-xs align-top pt-3">43</span>
              <span className="text-blue-500 font-bold">prime</span>
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
