export function BlogFooter() {
  return (
    <footer className="py-12 px-6 border-t border-[#ff00ff]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-[10px] text-[#ff00ff] font-black uppercase tracking-[0.5em] opacity-30">
            (c) 2026 pcstyle.dev
          </p>
          <span className="text-[10px] text-gray-800 uppercase tracking-widest font-mono">
            PROTOCOL_RESERVED: DEVLOG-777-ALPHA
          </span>
        </div>
        <div className="flex gap-10 text-gray-700">
          {["PRIVACY", "NETWORK", "API"].map((link) => (
            <span
              key={link}
              className="text-[10px] uppercase font-black hover:text-[#ff00ff] transition-all tracking-[0.3em]"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
