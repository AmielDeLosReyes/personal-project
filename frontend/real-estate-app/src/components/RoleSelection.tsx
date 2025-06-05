type RoleSelectionProps = {
    onSelect: (role: "contractor" | "rea") => void;
  };
  
  function RoleSelection({ onSelect }: RoleSelectionProps) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => onSelect("contractor")}
          className="px-6 py-3 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
        >
          I am a Contractor
        </button>
        <button
          onClick={() => onSelect("rea")}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-zinc-700 to-slate-600 text-white hover:scale-105 transition-all shadow-lg"
        >
          I am a Real Estate Agent
        </button>
      </div>
    );
  }
  
  export default RoleSelection;
  