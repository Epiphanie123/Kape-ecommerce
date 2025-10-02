import { useEffect, useState } from "react";
import { Eye, Trash2, X } from "lucide-react";

type ProductItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type Order = {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  products: ProductItem[];
  totalPrice: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const API_URL = "http://localhost:8000/api/orders/create";

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status } : order))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Delete order
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");

      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-gray-300 text-gray-800";
      case "processing":
        return "bg-yellow-400 text-white";
      case "completed":
        return "bg-green-600 text-white";
      case "cancelled":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Eye className="w-6 h-6" /> Orders Management
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{order.customerName}</td>
                  <td className="border px-4 py-2">{order.email}</td>
                  <td className="border px-4 py-2">{order.phone}</td>
                  <td className="border px-4 py-2">{order.address}</td>
                  <td className="border px-4 py-2 font-bold">${order.totalPrice}</td>
                  <td className={`border px-4 py-2 text-center font-semibold rounded ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border p-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={() => setViewOrder(order)} className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                      <Eye className="w-5 h-5 text-blue-700" />
                    </button>
                    <button onClick={() => handleDelete(order._id)} className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                      <Trash2 className="w-5 h-5 text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Order Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 md:w-1/2 max-h-[80vh] overflow-auto relative">
            <button onClick={() => setViewOrder(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details: {viewOrder.customerName}</h2>
            {viewOrder.products.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b p-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${Number(item.price) * item.quantity}</p>
                </div>
              </div>
            ))}
            <p className="mt-4 font-bold">Total: ${viewOrder.totalPrice}</p>
            <button onClick={() => setViewOrder(null)} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
