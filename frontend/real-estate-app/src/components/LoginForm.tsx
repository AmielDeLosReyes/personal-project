import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Input from "./Input";

type Role = "contractor" | "rea";

type LoginFormProps = {
    role: Role;
    onBack: () => void;
  };

export default function LoginForm({ role, onBack }: LoginFormProps) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
  
    try {
      const data = await login(form.username, form.password);
      
      // Store token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role || role); // If role isn't in response, fallback to local
  
      setStatus({ type: "success", message: "Login successful!" });
  
      navigate("/dashboard"); // ✅ Navigate after storing token
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md w-full p-6 bg-neutral-800 rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

      <form className="text-left" onSubmit={handleSubmit}>
        {status && (
          <div
            className={`mb-4 p-4 rounded-lg border text-sm shadow ${
              status.type === "success"
                ? "bg-green-700/40 text-green-300 border-green-500/30"
                : "bg-red-700/40 text-red-300 border-red-500/30"
            }`}
          >
            {status.message}
          </div>
        )}

        <Input
          id="username"
          label="Username or Email"
          placeholder="Enter your username or email"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-6 py-3 rounded bg-gradient-to-r from-zinc-700 to-slate-600 hover:scale-105 transition-all text-white font-semibold"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <button
        onClick={onBack}
        className="mt-6 text-gray-400 underline hover:text-gray-300 block mx-auto"
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
}
