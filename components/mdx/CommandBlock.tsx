import type { ReactNode } from "react";

interface CommandBlockProps {
  title?: string;
  children: ReactNode;
}

export function CommandBlock({ title, children }: CommandBlockProps) {
  return (
    <div className="my-6 border border-[#ff00ff]/20 bg-black/60">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#ff00ff]/20">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#ff00ff] font-black">
          {title ?? "COMMAND"}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">curl</span>
      </div>
      <pre className="px-4 py-3 text-xs text-gray-200 overflow-x-auto font-mono leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
