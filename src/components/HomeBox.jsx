function HomeBox({ title, items, linkText }) {
  return (
    <div className="bg-white p-5 shadow-sm w-[32%] min-h-[380px]">
      <h3 className="font-bold text-[17px] mb-3 text-gray-900">{title}</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <img
              src={item.img}
              alt={item.caption}
              className="w-full h-28 object-cover"
              loading="lazy"
            />
            <p className="mt-1 text-xs text-gray-700">{item.caption}</p>
          </div>
        ))}
      </div>

      <a
        href="#"
        className="text-xs text-blue-600 hover:text-orange-600 transition font-medium"
      >
        {linkText} →
      </a>
    </div>
  );
}

export default HomeBox;
