import { useState } from "react";
import SignupForm from "../../components/SignupForm";
import LoginForm from "../../components/LoginForm";
import BackgroundBlobs from "../../components/BackgroundBlobs";
import RoleSelection from "../../components/RoleSelection";

type Props = {
  title: string;
};

type Role = "contractor" | "rea" | null;

function LandingPage({ title }: Props) {
  const [role, setRole] = useState<Role>(null);
  const [mode, setMode] = useState<"signup" | "login">("signup");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-slate-900 to-gray-900 text-white flex items-center justify-center overflow-hidden relative px-4 py-10">
      <BackgroundBlobs />

      <div className="relative z-10 max-w-xl w-full bg-neutral-800 bg-opacity-70 p-8 rounded-xl shadow-lg animate-fade-in max-h-[90vh] overflow-y-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-300 to-gray-400 text-transparent bg-clip-text leading-tight text-center">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 text-center">
          Connecting contractors and real estate agents through smart listings and seamless communication.
        </p>

        {role === null ? (
          <RoleSelection onSelect={setRole} />
        ) : mode === "signup" ? (
          <SignupForm
            role={role}
            onBack={() => setRole(null)}
            onSwitchToLogin={() => setMode("login")}
          />
        ) : (
          <LoginForm
            onBack={() => setMode("signup")}
            role={role}
          />
        )}
      </div>
    </div>
  );
}

export default LandingPage;
