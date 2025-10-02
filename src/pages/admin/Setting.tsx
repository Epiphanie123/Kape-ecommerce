import { useState } from "react";

function Setting() {
  const [username, setUsername] = useState("admin");
  const [email, setEmail] = useState("admin@example.com");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">⚙️ Settings</h1>

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition max-w-xl mx-auto">
        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Dark Mode Toggle */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-gray-700 font-bold">Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-5 w-5 text-gray-600"
          />
        </div>

        {/* Notifications Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-gray-700 font-bold">Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="h-5 w-5 text-gray-600"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Setting;
