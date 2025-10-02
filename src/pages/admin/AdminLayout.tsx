import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiMail,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiSend,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useEffect, useState } from "react";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAdminName(data.name || "Admin");
        } else {
          setAdminName("Admin");
        }
      } catch (error) {
        console.error("Error fetching admin:", error);
        setAdminName("Admin");
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const SidebarLinks = () => (
    <>
      <Link
        to="/admin/dashboard"
        className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
          isActive("/admin/dashboard") ? "bg-gray-500" : ""
        }`}
      >
        <FiHome /> Dashboard
      </Link>
      <Link
        to="/admin/products"
        className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
          isActive("/admin/products") ? "bg-gray-500" : ""
        }`}
      >
        <FiBox /> Products
      </Link>
      <Link
        to="/admin/users"
        className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
          isActive("/admin/users") ? "bg-gray-500" : ""
        }`}
      >
        <FiUsers /> Users
      </Link>
      <Link
        to="/admin/orders"
        className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
          isActive("/admin/orders") ? "bg-gray-500" : ""
        }`}
      >
        <FiShoppingCart /> Orders
      </Link>
      <Link
        to="/admin/Messages"
        className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
          isActive("/admin/Messages") ? "bg-gray-500" : ""
        }`}
      >
        <FiMail /> Messages
      </Link>
      <Link
        to="/admin/subscribe"
        className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
          isActive("/admin/subscribe") ? "bg-gray-500" : ""
        }`}
      >
        <FiSend /> Subscribe
      </Link>
      <Link
        to="/admin/Report"
        className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
          isActive("/admin/Report") ? "bg-gray-500" : ""
        }`}
      >
        <FiBarChart2 /> Reports
      </Link>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex-col shadow-lg z-50">
        <div className="p-6 text-2xl font-bold border-b border-gray-500">
          Admin Panel
        </div>
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          <SidebarLinks />
        </nav>
        <div className="p-6 border-t border-gray-500">
          <Link
            to="/admin/Setting"
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
              isActive("/admin/Setting") ? "bg-gray-500" : ""
            }`}
          >
            <FiSettings /> Settings
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col shadow-lg z-50">
          <div className="p-6 text-2xl font-bold border-b border-gray-500 flex justify-between items-center">
            Admin Panel
            <button onClick={() => setSidebarOpen(false)}>
              <FiX size={24} />
            </button>
          </div>
          <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
            <SidebarLinks />
            <div className="p-6 border-t border-gray-500">
              <Link
                to="/admin/Setting"
                className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-gray-500 ${
                  isActive("/admin/Setting") ? "bg-gray-500" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <FiSettings /> Settings
              </Link>
            </div>
          </nav>
        </aside>
      </div>

      {/* Main content area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 md:left-64 flex items-center justify-between flex-nowrap bg-white shadow px-4 sm:px-6 py-3 z-40">
          {/* Mobile menu button */}
          <button
            className="md:hidden mr-3 text-gray-600 flex-shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>

          {/* Search bar */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg flex-1 min-w-0 mr-3">
            <FiSearch className="text-gray-500 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 min-w-0 text-sm sm:text-base"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 whitespace-nowrap">
            <button className="relative flex-shrink-0">
              <FiBell className="text-xl sm:text-2xl text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-950 rounded-full"></span>
            </button>

            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm">
              <FiUser className="text-base sm:text-xl text-gray-600 flex-shrink-0" />
              <span className="font-semibold truncate">Welcome, {adminName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-blue-950 font-semibold hover:underline text-xs sm:text-sm flex-shrink-0"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content with padding to avoid navbar overlap */}
        <main className="flex-1 mt-16 md:mt-20 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
