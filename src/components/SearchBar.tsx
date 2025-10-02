// components/SearchBar.tsx
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getProducts } from "../utils/api";
import type { Product } from "../data/products";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    );
  }, [query, products]);

  return (
    <div className="relative w-full max-w-full sm:max-w-lg md:max-w-2xl px-2 sm:px-0">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-card"
        aria-label="site search"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base outline-none"
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button className="px-3 sm:px-4" aria-label="search">
          <FiSearch className="text-lg sm:text-xl" />
        </button>
      </form>

      {/* 🔹 Search dropdown results */}
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 max-h-52 sm:max-h-64 overflow-y-auto rounded-md sm:rounded-lg bg-white shadow-lg z-40">
          {results.map((p) => (
            <li key={p.id} className="border-b last:border-none">
              <Link
                to={`/product/${p.id}`}
                className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-100"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded object-cover"
                />
                <div>
                  <p className="font-medium text-sm sm:text-base truncate max-w-[200px] sm:max-w-xs">
                    {p.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    ${p.price}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
