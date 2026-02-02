interface StatusChipProps {
  label: string;
  tone?: "magenta" | "cyan" | "neutral";
}

const TONES: Record<string, string> = {
  magenta: "border-[#ff00ff]/40 text-[#ff00ff]",
  cyan: "border-cyan-400/40 text-cyan-200",
  neutral: "border-white/20 text-gray-300",
};

export function StatusChip({ label, tone = "magenta" }: StatusChipProps) {
  const toneClass = TONES[tone] ?? TONES.magenta;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.3em] border font-mono font-black ${toneClass} mr-2 mb-2`}
    >
      {label}
    </span>
  );
}
