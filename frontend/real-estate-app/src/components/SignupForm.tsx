import React from "react";

type Role = "contractor" | "agent";

type SignupFormProps = {
  role: Role;
  onBack: () => void;
};

const Input = ({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) => (
  <div className="mb-4 text-left">
    <label htmlFor={id} className="block mb-1 text-gray-300 font-medium text-sm">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-md p-3 bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  </div>
);

export default function SignupForm({ role, onBack }: SignupFormProps) {
  return (
    <div className="max-w-md w-full p-6 bg-neutral-800 rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Sign Up as {role === "contractor" ? "Contractor" : "Real Estate Agent"}
      </h2>

      <form className="text-left" onSubmit={(e) => e.preventDefault()}>
        <Input id="fullName" label="Full Name" placeholder="Your full name" />
        <Input id="email" label="Email" type="email" placeholder="you@example.com" />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        {role === "contractor" && (
          <Input
            id="licenseNumber"
            label="Contractor License Number"
            placeholder="License number"
          />
        )}

        {role === "agent" && (
          <Input
            id="reaLicenseNumber"
            label="Real Estate License Number"
            placeholder="License number"
          />
        )}

        <button
          type="submit"
          className={`w-full mt-6 px-6 py-3 rounded ${
            role === "contractor"
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gradient-to-r from-zinc-700 to-slate-600 hover:scale-105 transition-all shadow-lg"
          } text-white font-semibold`}
        >
          Create Account
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
