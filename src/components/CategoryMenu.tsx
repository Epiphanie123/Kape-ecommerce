import { useState } from "react";
import { FiGrid, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

interface CategoryMenuProps {
  className?: string;
}

const categories = [
  { name: "Men's Clothing", subcategories: ["T-Shirts", "Shirts", "Jeans", "Suits", "Winter Wear"] },
  { name: "Women's Clothing", subcategories: ["Dresses", "Tops", "Skirts", "Jeans", "Winter Wear"] },
  { name: "Accessories", subcategories: ["Bags", "Watches", "Sunglasses", "Belts", "Hats"] },
  { name: "Shoes", subcategories: ["Sports Shoes", "Casual Shoes", "Formal Shoes", "Boots", "Sandals"] },
  { name: "Jewellery", subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings", "Watches"] },
  { name: "Bags & Backpacks", subcategories: ["Handbags", "Backpacks", "Luggage", "Wallets", "Purses"] },
  { name: "Watches", subcategories: ["Analog", "Digital", "Smart Watches", "Luxury", "Sports"] },
  { name: "Dresses", subcategories: ["Casual", "Formal", "Evening", "Summer", "Party"] },
  { name: "Shirts", subcategories: ["Casual Shirts", "Formal Shirts", "Long Sleeve", "Short Sleeve", "Printed"] }
];

export default function CategoryMenu({ className }: CategoryMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<null | typeof categories[0]>(null);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className={`btn-outline flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${className}`}
      >
        <FiGrid /> <span className="font-semibold">Shop By Categories</span>
      </button>

      {/* Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Categories Sidebar */}
          <div
            className="relative w-80 bg-white h-full shadow-xl"
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">SHOP BY CATEGORIES</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-4 space-y-1">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(category)}
                >
                  <Link
                    to="/shop"
                    className="block py-3 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-all duration-200 font-medium border border-transparent hover:border-gray-200"
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {activeCategory ? (
            <div className="relative ml-0 w-64 bg-white h-full shadow-lg border-l border-gray-200">
              <div className="p-6">
                <h4 className="font-semibold text-xl text-gray-800 mb-6 border-b pb-3">
                  {activeCategory.name}
                </h4>
                <div className="space-y-3">
                  {activeCategory.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      to="/shop"
                      className="block py-2 px-4 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>

                {/* Dynamic Banners */}
                {["Shirts", "Dresses"].includes(activeCategory.name) ? (
                  <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg">
                    <div className="text-red-600 font-bold text-lg">SALE</div>
                    <div className="text-red-700 font-bold text-2xl mb-2">50% OFF</div>
                    <div className="text-sm text-gray-600 mb-3">On all {activeCategory.name}</div>
                    <button
                      className="w-full bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SHOP NOW
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-lg">
                    <div className="text-blue-600 font-bold text-lg">SPECIAL OFFER</div>
                    <div className="text-blue-700 font-bold text-xl mb-2">UP TO 30% OFF</div>
                    <div className="text-sm text-gray-600 mb-3">On selected {activeCategory.name}</div>
                    <button
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      EXPLORE DEALS
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative ml-0 w-64 bg-gray-50 h-full border-l border-gray-200 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-gray-400 text-6xl mb-4">👆</div>
                <h4 className="font-semibold text-gray-600 mb-2">Select a Category</h4>
                <p className="text-gray-500 text-sm">Hover over any category to see its subcategories and offers</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
