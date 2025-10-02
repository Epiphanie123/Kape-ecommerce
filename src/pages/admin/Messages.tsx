import { useState } from "react";
import { FiTrash2, FiEye, FiEdit, FiSend, FiX } from "react-icons/fi";

interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

const sampleMessages: Message[] = [
  { id: 1, sender: "John Doe", email: "john@example.com", subject: "Order Help", content: "Hi, I need help with my order.", date: "2025-09-20", read: false },
  { id: 2, sender: "Jane Smith", email: "jane@example.com", subject: "Address Change", content: "Can I change my delivery address?", date: "2025-09-21", read: true },
  { id: 3, sender: "Bob Johnson", email: "bob@example.com", subject: "Feedback", content: "Great service, thanks!", date: "2025-09-22", read: false },
];

function Messages() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const toggleRead = (id: number) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, read: !msg.read } : msg));
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleSendReply = () => {
    if (!replyContent) return;
    alert(`Reply sent to ${selectedMessage?.sender}: ${replyContent}`);
    setReplyContent("");
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6">📧 Messages</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-left text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 sm:px-6 py-2 font-semibold">Sender</th>
              <th className="px-4 sm:px-6 py-2 font-semibold">Email</th>
              <th className="px-4 sm:px-6 py-2 font-semibold">Subject</th>
              <th className="px-4 sm:px-6 py-2 font-semibold">Date</th>
              <th className="px-4 sm:px-6 py-2 font-semibold">Status</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className={`border-b border-gray-200 hover:bg-gray-50 transition ${msg.read ? "bg-gray-50" : "bg-gray-100 font-bold"}`}
              >
                <td className="px-4 sm:px-6 py-2">{msg.sender}</td>
                <td className="px-4 sm:px-6 py-2 break-all">{msg.email}</td>
                <td className="px-4 sm:px-6 py-2">{msg.subject}</td>
                <td className="px-4 sm:px-6 py-2">{msg.date}</td>
                <td className="px-4 sm:px-6 py-2">{msg.read ? "Read" : "Unread"}</td>
                <td className="px-4 sm:px-6 py-2 flex gap-2 justify-center">
                  <button onClick={() => setSelectedMessage(msg)} className="text-green-500 hover:text-green-700 p-1 sm:p-2 rounded">
                    <FiEye size={18} />
                  </button>
                  <button onClick={() => toggleRead(msg.id)} className="text-blue-500 hover:text-blue-700 p-1 sm:p-2 rounded">
                    <FiEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(msg.id)} className="text-red-700 hover:text-red-900 p-1 sm:p-2 rounded">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full sm:w-3/4 md:w-1/2 relative p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">{selectedMessage.subject}</h2>
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              <span className="font-medium">From:</span> {selectedMessage.sender} ({selectedMessage.email})
            </p>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">{selectedMessage.content}</p>

            {/* Reply Section */}
            <textarea
              className="w-full border border-gray-300 p-2 sm:p-3 rounded mb-4 text-sm sm:text-base"
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button
              onClick={handleSendReply}
              className="flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-gray-800 transition w-full sm:w-auto"
            >
              <FiSend /> Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
