import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
export type Product = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
  brand?: string;
  badge?: { label: string; color: string };
  compareAt?: number;
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Product) => void;
  deleteProduct: (id: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    { _id: "p1", name: "Noise Cancelling Headphones", price: 129.99, description: "Wireless over-ear ANC", image: "/wireless.jpg" },
    { _id: "p2", name: "4K Smart TV 55”", price: 599, description: "Crisp 4K panel with HDR10+", image: "/smart.jpg" },
    { _id: "p3", name: "iPhone", price: 999, description: "Latest iPhone model", image: "/12.jpg" },
  ]);

  const addProduct = (product: Product) => {
    const newProduct = { _id: `p${Date.now()}`, ...product };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updated: Product) => {
    setProducts(products.map(p => (p._id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
