import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.error || "❌ Subscription failed.");
      }
    } catch {
      setMessage("⚠️ Error connecting to server.");
    }

    setLoading(false);
  };

  // Track open sections for mobile collapsible
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="mt-16 bg-gray-900 text-white">
      <div className="container-max py-12 flex flex-col gap-6">
        {/* About */}
        <div className="sm:hidden">
          <button
            type="button"
            className="w-full flex justify-between items-center py-2 font-bold text-lg"
            onClick={() => toggleSection("about")}
          >
            About
            <span>{openSection === "about" ? "▲" : "▼"}</span>
          </button>
          {openSection === "about" && (
            <p className="text-sm text-gray-400 mt-2">
              A fast, clean, modern electronics store experience built with React + Tailwind.
            </p>
          )}
        </div>
        <div className="hidden sm:block">
          <h4 className="mb-3 text-lg font-bold">About</h4>
          <p className="text-sm text-gray-400">
            A fast, clean, modern electronics store experience built with React + Tailwind.
          </p>
        </div>

        {/* Customer Care */}
        <div className="sm:hidden">
          <button
            type="button"
            className="w-full flex justify-between items-center py-2 font-bold text-lg"
            onClick={() => toggleSection("customer")}
          >
            Customer Care
            <span>{openSection === "customer" ? "▲" : "▼"}</span>
          </button>
          {openSection === "customer" && (
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Track Order</li>
            </ul>
          )}
        </div>
        <div className="hidden sm:block">
          <h4 className="mb-3 text-lg font-bold">Customer Care</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Help Center</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Company */}
        <div className="sm:hidden">
          <button
            type="button"
            className="w-full flex justify-between items-center py-2 font-bold text-lg"
            onClick={() => toggleSection("company")}
          >
            Company
            <span>{openSection === "company" ? "▲" : "▼"}</span>
          </button>
          {openSection === "company" && (
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          )}
        </div>
        <div className="hidden sm:block">
          <h4 className="mb-3 text-lg font-bold">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-3 text-lg font-bold">Newsletter</h4>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={handleSubscribe}
          >
            <input
              className="w-full rounded-lg border px-3 py-2 text-gray-900"
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg px-4 py-2 transition"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="mt-2 text-sm text-gray-400">{message}</p>}
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Kapee UI. All rights reserved.
      </div>
    </footer>
  );
}
