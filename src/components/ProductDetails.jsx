import { Link } from "react-router-dom";

function ProductDetails({ product_detail }) {
  if (!product_detail) return null;

  const { id, title, image, descp, price } = product_detail;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-300">
      <Link to={`/home/product/${id}`} className="block">
        {/* 🔹 Product Image */}
        <div className="relative w-full bg-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden rounded-t-xl">
          <img
            src={image || "https://via.placeholder.com/250"}
            alt={title || "Product"}
            className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* 🔸 Small hover overlay effect */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* 🔹 Product Info */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-[15px] md:text-[16px] font-medium text-gray-900 line-clamp-2 group-hover:text-[#007185] transition-colors">
            {title || "Unnamed Product"}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 leading-snug">
            {descp || "No description available."}
          </p>

          <div className="flex items-baseline justify-between mt-1">
            <h4 className="text-lg md:text-xl font-semibold text-gray-900">
              ₦{price || "0.00"}
            </h4>
            <span className="text-xs text-green-600 font-semibold">
              In stock
            </span>
          </div>

          {/* 🔹 Button */}
          <button
            className="
              mt-3 bg-yellow-400 hover:bg-yellow-500 
              text-sm md:text-[15px] font-semibold 
              rounded-full py-2 transition-all duration-200
              shadow-sm hover:shadow
            "
          >
            View Details
          </button>
        </div>
      </Link>
    </div>
  );
}

export default ProductDetails;
