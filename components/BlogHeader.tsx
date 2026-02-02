import Link from "next/link";
import { Terminal } from "lucide-react";

interface BlogHeaderProps {
  title?: string;
  subtitle?: string;
  version?: string;
}

export function BlogHeader({
  title = "blog.pcstyle.dev",
  subtitle = "DEVELOPER_LOG_PROTOCOL",
  version = "v0.1.0",
}: BlogHeaderProps) {
  return (
    <header className="border-b border-[#ff00ff]/20 bg-black/95 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-[#ff00ff] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_#ff00ff66] transition-all group-hover:shadow-[0_0_25px_#ff00ff]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase group-hover:text-[#ff00ff] transition-colors">
              {title.split(".")[0]}
              <span className="text-[#ff00ff]/40">.{title.split(".").slice(1).join(".")}</span>
            </h1>
            <p className="text-xs text-gray-600 uppercase tracking-[0.3em] font-mono">
              {subtitle}
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs text-gray-500 font-mono uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SYSTEM_ONLINE
          </span>
          <span>{version}</span>
        </div>
      </div>
    </header>
  );
}
