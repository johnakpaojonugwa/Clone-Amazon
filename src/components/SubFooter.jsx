import React from "react";

const SubFooter = () => {
  return (
    <div>
             <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="Backtotop bg-[#586370] text-gray-200 font-[13px] text-center py-[15px] cursor-pointer hover:bg-gray-600">
    Back To Top
  </div>

    <footer className="bg-[#232F3E] text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold mb-3">Get to Know Us</h3>
          <ul className="space-y-1">
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Make Money with Us</h3>
          <ul className="space-y-1">
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Host an Amazon Hub</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Amazon Payment Products</h3>
          <ul className="space-y-1">
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Let Us Help You</h3>
          <ul className="space-y-1">
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className="h-5"
        />
        <div className="flex gap-4 text-gray-300 text-sm">
          <button className="border border-gray-500 rounded px-3 py-1">🌐 English</button>
          <button className="border border-gray-500 rounded px-3 py-1">$ USD - U.S. Dollar</button>
          <button className="border border-gray-500 rounded px-3 py-1">🇺🇸 United States</button>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default SubFooter;
