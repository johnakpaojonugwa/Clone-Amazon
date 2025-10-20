import { Link } from "react-router-dom";

function ProductDetails({ product_detail }) {
  if (!product_detail) return null;

  const { id, title, image, description, price } = product_detail;

  return (
    <div className="bg-white shadow-md hover:shadow-lg overflow-hidden w-[200px] transition-all duration-200">
      <Link to={`/home/product/${id}`}>
        <div className="w-full h-[150px] flex items-center justify-center bg-gray-50">
          <img
            src={image || "https://via.placeholder.com/250"}
            alt={title || "Product"}
            className="object-contain h-full w-full"
          />
        </div>

        <div className="p-3 flex flex-col justify-between h-[180px]">
          <h3 className="text-[15px] font-semibold text-gray-800 line-clamp-2">
            {title || "Unnamed Product"}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-3 mt-1">
            {description || "No description available."}
          </p>

          <h4 className="text-lg font-bold text-gray-900 mt-2">
            ₦{price || "0.00"}
          </h4>

          <div className="mt-3">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-full px-4 py-1.5 w-full">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductDetails;
