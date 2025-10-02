// src/pages/admin/Products.tsx
import { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX, FiEye } from "react-icons/fi";
import { useProducts } from "../../context/ProductContext";
import type { Product } from "../../context/ProductContext"; // ✅ type-only import

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({ name: "", price: 0, description: "", image: "" });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Omit<Product, "_id">>({ name: "", price: 0, description: "", image: "" });
  const [showForm, setShowForm] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const targetProduct = editingProductId ? editingProduct : newProduct;
    const setTarget = editingProductId ? setEditingProduct : setNewProduct;
    setTarget({ ...targetProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingProductId) setEditingProduct({ ...editingProduct, image: reader.result as string });
        else setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct as Product);
    setNewProduct({ name: "", price: 0, description: "", image: "" });
    setShowForm(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;
    updateProduct(editingProductId, editingProduct as Product);
    setEditingProductId(null);
    setEditingProduct({ name: "", price: 0, description: "", image: "" });
    setShowForm(false);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this product?")) deleteProduct(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Admin Products</h1>

      <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition mb-6">
        {showForm ? <FiX /> : <FiPlus />}
        {showForm ? "Close Form" : editingProductId ? "Edit Product" : "Add Product"}
      </button>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={editingProductId ? handleUpdate : handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Product Name" value={editingProductId ? editingProduct.name : newProduct.name} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input type="number" name="price" placeholder="Price" value={editingProductId ? editingProduct.price : newProduct.price} onChange={handleChange} className="w-full border p-2 rounded" required />
            <textarea name="description" placeholder="Description" value={editingProductId ? editingProduct.description : newProduct.description} onChange={handleChange} className="w-full border p-2 rounded" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
            <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">{editingProductId ? "Update Product" : "Add Product"}</button>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">Products List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{p.image && <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />}</td>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">${p.price}</td>
                <td className="border px-4 py-2">{p.description}</td>
                <td className="border px-4 py-2 flex space-x-2 justify-center">
                  <button onClick={() => setViewProduct(p)} className="text-green-500 hover:text-green-700"><FiEye size={18} /></button>
                  <button onClick={() => { setEditingProductId(p._id || null); setEditingProduct({ name: p.name, price: p.price, description: p.description, image: p.image || "" }); setShowForm(true); }} className="text-blue-500 hover:text-blue-700"><FiEdit size={18} /></button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700"><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={() => setViewProduct(null)}><FiX size={20} /></button>
            {viewProduct.image && <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-64 object-cover rounded mb-4" />}
            <h2 className="text-2xl font-bold mb-2">{viewProduct.name}</h2>
            <p className="text-gray-700 mb-2">Price: ${viewProduct.price}</p>
            {viewProduct.category && <p className="text-gray-600 mb-2">Category: {viewProduct.category}</p>}
            <p className="text-gray-600">{viewProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
