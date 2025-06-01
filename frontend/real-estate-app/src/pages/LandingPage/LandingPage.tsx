import { useState } from "react";
import SignupForm from "../../components/SignupForm";

type Props = {
  title: string;
};

type Role = "contractor" | "agent" | null;

function LandingPage({ title }: Props) {
  const [role, setRole] = useState<Role>(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-slate-900 to-gray-900 text-white flex items-center justify-center overflow-hidden relative px-4 py-10">
      {/* Background Blobs (muted greys) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-zinc-600 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-700 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-slate-700 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-700"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-xl w-full bg-neutral-800 bg-opacity-70 p-8 rounded-xl shadow-lg animate-fade-in max-h-[90vh] overflow-y-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-300 to-gray-400 text-transparent bg-clip-text leading-tight text-center">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 text-center">
          Connecting contractors and real estate agents through smart listings and seamless communication.
        </p>

        {role === null ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setRole("contractor")}
              className="px-6 py-3 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
            >
              I am a Contractor
            </button>
            <button
              onClick={() => setRole("agent")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-zinc-700 to-slate-600 text-white hover:scale-105 transition-all shadow-lg"
            >
              I am a Real Estate Agent
            </button>
          </div>
        ) : (
          <SignupForm role={role} onBack={() => setRole(null)} />
        )}
      </div>
    </div>
  );
}


export default LandingPage;
