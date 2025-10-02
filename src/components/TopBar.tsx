import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="w-full bg-yellow-400 text-black text-xs sm:text-sm">
      <div className="container-max flex flex-col sm:flex-row items-center justify-between py-2 gap-2 sm:gap-3 px-2 sm:px-4">
        {/* Sale Banner */}
        <p className="text-center sm:text-left hidden md:block">
          <span className="font-semibold">SUMMER SALE</span>, Get 40% Off for all products.
          <Link to="/shop" className="ml-2 underline">
            Shop now
          </Link>
        </p>

        <div className="flex-1 md:flex-none" />

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
          {/* Language Selector */}
          <select className="bg-yellow-400 text-black px-1 py-0.5 text-xs sm:text-sm">
            <option>English</option>
            <option>Français</option>
            <option>Deutsch</option>
            <option>العربية</option>
          </select>

          {/* Currency Selector */}
          <select className="bg-yellow-400 text-black px-1 py-0.5 text-xs sm:text-sm">
            <option>$ Dollar (US)</option>
            <option>₹ RUPEE (INR)</option>
            <option>£ Pound (UK)</option>
            <option>€ Euro (EUR)</option>
          </select>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
            <Link to="/support" className="hover:underline">
              FAQ
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
