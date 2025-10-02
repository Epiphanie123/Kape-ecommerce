import { Link, NavLink } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext'; // Make sure you have this

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.length;

  const { user, logout } = useAuth(); // get current user and logout function

  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <div className="w-full bg-white">
        <div className="container-max flex flex-wrap items-center gap-2 sm:gap-4 py-3 sm:py-4 px-2 sm:px-4">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-extrabold">
            KAPEE
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* Right Section */}
          <nav className="ml-auto flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <FiUser className="text-lg sm:text-xl" />
                <span className="hidden sm:inline">Hello, {user.fullname}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-xs sm:text-sm text-red-400 hover:underline"
                >
                  <FiLogOut />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <NavLink
                to="/account"
                className="flex items-center gap-1 hover:underline text-xs sm:text-sm"
              >
                <FiUser />
                <span className="hidden sm:inline">Hello, Sign In</span>
              </NavLink>
            )}

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative flex items-center gap-1 hover:underline text-xs sm:text-sm"
            >
              <FiShoppingCart className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Category + Nav */}
      <div className="w-full border-t bg-white">
        <div className="container-max flex flex-wrap items-center gap-2 sm:gap-3 py-2 sm:py-3 px-2 sm:px-4">
          {/* ✅ Now inline with nav */}
          <nav className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <CategoryMenu className="text-yellow-500 font-semibold" /> {/* yellow instead of red */}
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'font-semibold' : '')}
            >
              HOME
            </NavLink>
            <NavLink to="/Shop">SHOP</NavLink>
            <NavLink to="/Page">PAGES</NavLink>
            <NavLink to="/Blog">BLOGS</NavLink>
            <NavLink to="/Element">SUPPORT</NavLink>
            <NavLink to="/Shop">BUYNOW</NavLink>
          </nav>

          {/* Mobile Search */}
          <div className="md:hidden ml-auto w-full mt-2 sm:mt-0">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
