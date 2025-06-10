type InputProps = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
  };
  
  export default function Input({ id, label, type = "text", placeholder, value, onChange, className = "" }: InputProps) {
    return (
      <div className={`mb-4 text-left ${className}`}>
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
  }
  