import { useState } from "react";
import { FiHeart, FiEye, FiShoppingCart, FiTag, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";

import { useCart } from "../hooks/useCart";

export interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
  brand?: string;
  badge?: { label: string; color: string };
  compareAt?: number;
}

export default function ProductCard({
  product,
  onDelete, // ✅ optional delete callback
}: {
  product: Product;
  onDelete?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();

  const id = product._id ?? "";
  const title = product.name;
  const image = product.image
    ? `http://localhost:8000/${product.image}`
    : "/placeholder.jpg";
  const price = product.price;
  const description = product.description;

  return (
    <div className="relative overflow-hidden rounded-xl border bg-white shadow-md hover:shadow-lg transition w-[260px]">
      {/* Badge */}
      {product.badge && (
        <span
          className="absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: product.badge.color }}
        >
          {product.badge.label}
        </span>
      )}

      {/* Admin Delete Button */}
      {onDelete && id && (
        <button
          onClick={() => onDelete(id)}
          className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded hover:bg-red-600"
          title="Delete Product"
        >
          <FiTrash2 size={14} />
        </button>
      )}

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {product.category && (
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {product.category}
          </p>
        )}
        <h3 className="mt-1 font-semibold line-clamp-1">{title}</h3>

        {product.brand && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <FiTag className="text-gray-400" />
            <span>{product.brand}</span>
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          {product.compareAt && (
            <span className="text-sm text-gray-400 line-through">
              ${product.compareAt.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            className="flex items-center justify-center rounded-md border p-2 text-gray-600 hover:bg-gray-100 transition"
            title="Wishlist"
          >
            <FiHeart />
          </button>
          <button
            className="flex items-center justify-center rounded-md border p-2 text-gray-600 hover:bg-gray-100 transition"
            onClick={() => setOpen(true)}
            title="Quick View"
          >
            <FiEye />
          </button>
          <button
            className="col-span-1 flex items-center justify-center gap-1 rounded-md bg-gray-800 text-white px-3 py-2 hover:bg-gray-900 transition"
            onClick={() =>
              addToCart({ id, title, price, image, quantity: 1 })
            }
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Quick View">
        <div className="grid gap-4 md:grid-cols-2">
          <img src={image} alt={title} className="w-full rounded-xl" />
          <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
              {product.compareAt && (
                <span className="text-gray-400 line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
            </div>
            <button
              className="mt-4 w-full rounded-md bg-gray-800 text-white px-4 py-2 font-semibold hover:bg-gray-900 transition"
              onClick={() =>
                addToCart({ id, title, price, image, quantity: 1 })
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
