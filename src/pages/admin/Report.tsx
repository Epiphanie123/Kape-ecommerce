import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

// Sample data
const salesData = [
  { day: "Mon", sales: 400 },
  { day: "Tue", sales: 300 },
  { day: "Wed", sales: 500 },
  { day: "Thu", sales: 700 },
  { day: "Fri", sales: 600 },
  { day: "Sat", sales: 800 },
  { day: "Sun", sales: 500 },
];

const revenueData = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 3908 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
  { month: "Jul", revenue: 4300 },
];

const orderStatus = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Cancelled", value: 10 },
];

const userGrowthData = [
  { week: "W1", users: 120 },
  { week: "W2", users: 180 },
  { week: "W3", users: 90 },
  { week: "W4", users: 200 },
];

const topProducts = [
  { name: "Sneakers", sales: 320 },
  { name: "T-Shirts", sales: 210 },
  { name: "Jeans", sales: 150 },
  { name: "Hats", sales: 90 },
];

const COLORS = ["#374151", "#6b7280", "#9ca3af"]; // Gray tones

function Report() {
  const [selectedPeriod, setSelectedPeriod] = useState("Week");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📊 Reports</h1>
        <div className="flex bg-white rounded-lg shadow-sm">
          {["Day", "Week", "Month", "Annual"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? "bg-gray-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              } ${period === "Day" ? "rounded-l-lg" : period === "Annual" ? "rounded-r-lg" : ""}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-1">Total Sales</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">$25,600</p>
          <p className="text-xs text-gray-400">15% increase from last week</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">1,200</p>
          <p className="text-xs text-gray-400">8% increase from last week</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-1">New Users</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">320</p>
          <p className="text-xs text-gray-400">5% increase from last week</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">45</p>
          <p className="text-xs text-gray-400">No change from last week</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Weekly Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#374151" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#374151" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />
              <Area type="monotone" dataKey="sales" stroke="#374151" strokeWidth={3} fill="url(#salesGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Order Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* More Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#6b7280" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-800 mb-4">👥 Weekly User Growth</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={userGrowthData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="users" fill="#9ca3af" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products Table */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Top Selling Products</h2>
          <table className="min-w-full text-left text-gray-800">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-gray-500 font-semibold">Product</th>
                <th className="px-4 py-2 text-gray-500 font-semibold">Sales</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((item, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 font-bold">{item.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
