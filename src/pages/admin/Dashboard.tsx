import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useState } from "react";

const dailySales = [
  { day: "1st", sales: 1000 },
  { day: "2nd", sales: 3000 },
  { day: "3rd", sales: 2000 },
  { day: "4th", sales: 5000 },
  { day: "5th", sales: 4000 },
  { day: "6th", sales: 6000 },
  { day: "7th", sales: 7000 },
];

const orderStatus = [
  { name: "Orders", value: 60 },
  { name: "Pending", value: 40 },
  { name: "Declined", value: 20 },
];



const GRAY_COLORS = ["#4B5563", "#6B7280", "#9CA3AF"]; // muted gray tones

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [location, setLocation] = useState("San Francisco");

  const tooltipStyle = {
    backgroundColor: "#FDF6E3", // soft yellow background
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    padding: "8px 12px",
    fontWeight: 500,
    color: "#111827",
  };

  // Current date info
  const today = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = weekdays[today.getDay()];
  const dayOfMonth = today.getDate();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const currentMonth = months[today.getMonth()];
  const currentYear = today.getFullYear();

  const getWeekNumber = (d: Date) => {
    const oneJan = new Date(d.getFullYear(),0,1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24*60*60*1000));
    return Math.ceil(( d.getDay() + 1 + numberOfDays) / 7);
  }
  const currentWeek = getWeekNumber(today);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Ecommerce Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Dashboard • Customize Dashboard
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option>San Francisco</option>
            <option>New York</option>
            <option>London</option>
          </select>

          <div className="flex bg-white rounded-lg shadow-sm">
            {["Day", "Week", "Month", "Annual"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors ${
                  selectedPeriod === period
                    ? "bg-yellow-400 text-white"
                    : "text-gray-600 hover:text-gray-800"
                } ${period === "Day" ? "rounded-l-lg" : period === "Annual" ? "rounded-r-lg" : ""}`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="text-gray-700 text-sm sm:text-base">
            {currentDay}, {currentMonth} {dayOfMonth}, {currentYear} (Week {currentWeek})
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div className="relative bg-yellow-200 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-md">
          <div>
            <p className="text-sm opacity-90 mb-1">NEW ORDERS</p>
            <p className="text-2xl sm:text-3xl font-bold mb-1">7</p>
            <p className="text-xs opacity-80">20.5% from last days</p>
          </div>
        </div>

        <div className="relative bg-yellow-300 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-md">
          <div>
            <p className="text-sm opacity-90 mb-1">TOTAL INCOME</p>
            <p className="text-2xl sm:text-3xl font-bold mb-1">$14,00</p>
            <p className="text-xs opacity-80">2.3% from last month</p>
          </div>
        </div>

        <div className="relative bg-yellow-400 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-md">
          <div>
            <p className="text-sm opacity-90 mb-1">TOTAL PRODUCTS</p>
            <p className="text-2xl sm:text-3xl font-bold mb-1">6</p>
            <p className="text-xs opacity-80">1.8% from yesterday</p>
          </div>
        </div>

        <div className="relative bg-yellow-500 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-md">
          <div>
            <p className="text-sm opacity-90 mb-1">NEW USERS</p>
            <p className="text-2xl sm:text-3xl font-bold mb-1">6</p>
            <p className="text-xs opacity-80">5.2% from last week</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">📈 Product Sales (Daily)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dailySales}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GRAY_COLORS[0]} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={GRAY_COLORS[0]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false}/>
              <YAxis axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={tooltipStyle}/>
              <Area
                type="monotone"
                dataKey="sales"
                stroke={GRAY_COLORS[0]}
                strokeWidth={2}
                fill="url(#salesGradient)"
                activeDot={{ r: 5, stroke: GRAY_COLORS[1], strokeWidth: 2, fill: "#FFF9E5" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">📊 Order Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {orderStatus.map(( index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GRAY_COLORS[ GRAY_COLORS.length]}
                    stroke="#F59E0B"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle}/>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-base font-bold text-gray-700 mt-2">Total Orders: 120</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
