// src/pages/Shop.tsx
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import type { Product } from "../context/ProductContext";
import { FiX } from "react-icons/fi";

export default function Shop() {
  const { products } = useProducts();
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  return (
    <section className="container-max my-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shop</h1>
        <p className="text-gray-600">Browse all products.</p>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p._id} className="relative cursor-pointer" onClick={() => setViewProduct(p)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing product */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setViewProduct(null)}
            >
              <FiX size={20} />
            </button>
            {viewProduct.image && (
              <img
                src={viewProduct.image}
                alt={viewProduct.name}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-2">{viewProduct.name}</h2>
            <p className="text-gray-700 mb-2">Price: ${viewProduct.price}</p>
            {viewProduct.category && (
              <p className="text-gray-600 mb-2">Category: {viewProduct.category}</p>
            )}
            <p className="text-gray-600">{viewProduct.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
