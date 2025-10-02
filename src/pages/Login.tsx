import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login(email, password);

      // Navigate based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed", err.message);
        alert(`Login failed: ${err.message}`);
      } else {
        console.error("Login failed", err);
        alert("Login failed: Unknown error");
      }
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 mb-6 text-center">Sign in to your account to continue.</p>

        <form
          className="bg-white rounded-lg shadow-lg p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full rounded-lg border px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              className="w-full rounded-lg border px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              href="/passwordReset"
              className="absolute right-2 top-2 text-sm text-yellow-400 hover:underline"
            >
              Forgot?
            </a>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button className="w-full bg-yellow-400 text-white py-3 rounded-lg font-semibold transition-transform hover:scale-[1.02] hover:shadow-lg">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
