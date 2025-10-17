import React from "react";

const MainFooter = () => {
  const items = [
    "Amazon Music",
    "Amazon Ads",
    "6pm",
    "AbeBooks",
    "ACX",
    "Sell on Amazon",
    "Veeqo",
    "Amazon Business",
    "AmazonGlobal",
    "Amazon Web Services",
    "Audible",
    "Box Office Mojo",
    "Goodreads",
    "IMDb",
    "IMDbPro",
    "Kindle Direct Publishing",
    "Prime Video Direct",
    "Shopbop",
    "Woot!",
    "Zappos",
    "Ring",
  ];

  return (
    <footer className="bg-[#131A22] text-gray-300 text-xs py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-6">
        {items.map((item, i) => (
          <div key={i}>
            <h4 className="font-semibold text-white">{item}</h4>
            <p className="text-gray-400 text-[11px] mt-1">
              Stream Millions of Music
            </p>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-400 border-t border-gray-700 pt-4">
        <p className="text-[11px]">
          Conditions of Use • Privacy Notice • Your Ads Privacy Choices
        </p>
        <p className="text-[11px] mt-1">
          © 1996–2025, Amazon Clone by dele5x, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;
