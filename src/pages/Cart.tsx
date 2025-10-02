import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user"); // assume login sets "user"
    if (!user) {
      navigate("/account");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    navigate("/payment");
  };

  const handleIncrease = (item: any) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleDecrease = (item: any) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 });
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantity Controls */}
                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline ml-3"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Total & Actions */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex gap-3">
              <button
                onClick={handlePlaceOrder}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
