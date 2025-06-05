import React, { useState } from "react";
import { signup } from "../services/authService";

type Role = "contractor" | "rea";

type SignupFormProps = {
  role: Role;
  onBack: () => void;
};

const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4 text-left">
    <label htmlFor={id} className="block mb-1 text-gray-300 font-medium text-sm">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-md p-3 bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  </div>
);

export default function SignupForm({ role, onBack }: SignupFormProps) {
  const [form, setForm] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    licenseNumber: '',
  });

  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await signup(form, role);
      setStatus({ type: 'success', message: 'Signup successful!' });

      // Optional: Reset form fields on success
      setForm({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        licenseNumber: '',
      });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Signup failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full p-6 bg-neutral-800 rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Sign Up as {role === "contractor" ? "Contractor" : "Real Estate Agent"}
      </h2>

      <form className="text-left" onSubmit={handleSubmit}>
        {status && (
          <div
            className={`mb-4 p-4 rounded-lg border text-sm shadow ${
              status.type === 'success'
                ? 'bg-green-700/40 text-green-300 border-green-500/30'
                : 'bg-red-700/40 text-red-300 border-red-500/30'
            }`}
          >
            {status.message}
          </div>
        )}

        <Input id="fullName" label="Full Name" placeholder="Your full name" value={form.fullName} onChange={handleChange} />
        <Input id="userName" label="Username" placeholder="Your Username" value={form.userName} onChange={handleChange} />
        <Input id="email" label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
        <Input id="password" label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />
        <Input
          id="licenseNumber"
          label={role === "contractor" ? "Contractor License Number" : "Real Estate License Number"}
          placeholder="License number"
          value={form.licenseNumber}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 px-6 py-3 rounded ${
            role === "contractor"
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gradient-to-r from-zinc-700 to-slate-600 hover:scale-105 transition-all shadow-lg"
          } text-white font-semibold`}
        >
          {loading ? "Signing up..." : "Create Account"}
        </button>
      </form>

      <button
        onClick={onBack}
        className="mt-6 text-gray-400 underline hover:text-gray-300 block mx-auto"
      >
        Back to Role Selection
      </button>
    </div>
  );
}
