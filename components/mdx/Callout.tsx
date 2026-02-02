import type { ReactNode } from "react";

const TONES: Record<string, string> = {
  magenta: "border-[#ff00ff]/40 bg-[#ff00ff]/5 text-[#ff00ff]",
  cyan: "border-cyan-400/40 bg-cyan-400/5 text-cyan-200",
  neutral: "border-white/15 bg-white/5 text-white",
};

interface CalloutProps {
  title?: string;
  tone?: "magenta" | "cyan" | "neutral";
  children: ReactNode;
}

export function Callout({ title, tone = "magenta", children }: CalloutProps) {
  const toneClass = TONES[tone] ?? TONES.magenta;

  return (
    <div className={`my-8 border px-5 py-4 backdrop-blur ${toneClass}`}>
      {title && (
        <div className="text-[10px] uppercase tracking-[0.4em] font-black mb-3">
          {title}
        </div>
      )}
      <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}
