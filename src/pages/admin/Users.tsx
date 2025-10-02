import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX, FiEye } from "react-icons/fi";

interface User {
  _id?: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User>({
    username: "",
    email: "",
    role: "user",
    password: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [viewEditMode, setViewEditMode] = useState(false);

  const API_URL = "http://localhost:8000/api/users";

  // Fetch users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (viewEditMode && viewUser) {
      setViewUser({ ...viewUser, [e.target.name]: e.target.value });
    } else {
      const targetUser = editingUserId ? editingUser : newUser;
      const setTarget = editingUserId ? setEditingUser : setNewUser;
      setTarget({ ...targetUser, [e.target.name]: e.target.value });
    }
  };

  // Add new user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        setNewUser({ username: "", email: "", password: "", role: "user" });
        setShowForm(false);
        fetchUsers();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Delete user
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit user in main form
  const handleEdit = (user: User) => {
    setEditingUserId(user._id || null);
    setEditingUser({
      username: user.username,
      email: user.email,
      role: user.role,
      password: "",
    });
    setShowForm(true);
  };

  // Update user in main form
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users/${editingUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingUser),
      });

      if (res.ok) {
        setEditingUserId(null);
        setEditingUser({ username: "", email: "", password: "", role: "user" });
        setShowForm(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Update user from modal
  const handleViewUpdate = async () => {
    if (!viewUser || !viewUser._id) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users/${viewUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(viewUser),
      });

      if (res.ok) {
        setViewEditMode(false);
        setViewUser(null);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Users Page</h1>

      {/* Toggle Form Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition mb-6"
      >
        {showForm ? <FiX /> : <FiPlus />}
        {showForm
          ? "Close Form"
          : editingUserId
          ? "Edit User"
          : "Add User"}
      </button>

      {/* Add/Edit User Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">
            {editingUserId ? "Edit User" : "Add New User"}
          </h2>
          <form
            onSubmit={editingUserId ? handleUpdate : handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block font-semibold mb-1 text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editingUserId ? editingUser.username : newUser.username}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editingUserId ? editingUser.email : newUser.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={editingUserId ? editingUser.password : newUser.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required={!editingUserId}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-600">
                Role
              </label>
              <select
                name="role"
                value={editingUserId ? editingUser.role : newUser.role}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-gray-700 text-white font-bold px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              {editingUserId ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">Users List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2 flex justify-center space-x-3">
                  {/* View Button */}
                  <button
                    onClick={() => {
                      setViewUser(user);
                      setViewEditMode(false);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEye size={18} />
                  </button>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FiEdit size={18} />
                  </button>
                  {/* Delete Button */}
                  {user._id && (
                    <button
                      onClick={() => handleDelete(user._id!)}
                      className="text-red-700 hover:text-red-900"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View/Edit User Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 max-h-[80vh] overflow-auto relative">
            <button
              onClick={() => setViewUser(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {viewEditMode ? "Edit User" : "User Details"}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="font-semibold text-gray-600">Username:</label>
                {viewEditMode ? (
                  <input
                    name="username"
                    value={viewUser.username}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  />
                ) : (
                  <p>{viewUser.username}</p>
                )}
              </div>
              <div>
                <label className="font-semibold text-gray-600">Email:</label>
                {viewEditMode ? (
                  <input
                    type="email"
                    name="email"
                    value={viewUser.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  />
                ) : (
                  <p>{viewUser.email}</p>
                )}
              </div>
              <div>
                <label className="font-semibold text-gray-600">Role:</label>
                {viewEditMode ? (
                  <select
                    name="role"
                    value={viewUser.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <p className="capitalize">{viewUser.role}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              {viewEditMode ? (
                <button
                  onClick={handleViewUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setViewEditMode(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => setViewUser(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
