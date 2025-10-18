function ProductRow({ title, products }) {
  return (
    <div className="bg-white px-6 py-4 mt-6 rounded-md shadow-sm">
      <h2 className="!font-bold text-[20px] mb-3 text-gray-900">{title}</h2>
      <div className="grid grid-cols-7 gap-2">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col items-center ">
            <img
              src={product.img}
              alt={product.name}
              className="h-52 object-contain mb-2"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRow;
