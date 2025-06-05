function BackgroundBlobs() {
    return (
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-zinc-600 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-700 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-slate-700 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-700"></div>
      </div>
    );
  }
  
  export default BackgroundBlobs;
  