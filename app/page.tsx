import path from "node:path";
import { readFile } from "node:fs/promises";
import { Terminal, Cpu, FileText } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { CustomMDX } from "@/components/mdx/CustomMDX";
import { StatusChip } from "@/components/mdx/StatusChip";

const FALLBACK_SLUG = "dual-author-protocol";
const FALLBACK_TITLE = "DEVELOPER LOG // DUAL-AUTHOR POSTING PIPELINE";
const FALLBACK_SUMMARY =
  "A split-voice devlog for pcstyle.dev: human intent + AI execution, fused into a single publishing protocol.";
const FALLBACK_TIMESTAMP = Date.UTC(2026, 1, 2, 9, 0, 0);

export const revalidate = 0;

async function loadFallbackContent() {
  const filePath = path.join(process.cwd(), "content", "dual-author-protocol.mdx");
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return "## ME MYSELF\nFallback content missing.";
  }
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function Home() {
  const post = await fetchQuery(api.posts.getPostBySlug, { slug: FALLBACK_SLUG });
  const content = post?.content ?? (await loadFallbackContent());
  const title = post?.title ?? FALLBACK_TITLE;
  const summary = post?.summary ?? FALLBACK_SUMMARY;
  const createdAt = post?.createdAt ?? FALLBACK_TIMESTAMP;
  const updatedAt = post?.updatedAt ?? createdAt;
  const displaySlug = post?.slug ?? FALLBACK_SLUG;

  const authorLabel = post
    ? post.authorType === "human"
      ? "PCSTYLE"
      : "AI AGENT"
    : "PCSTYLE + AI AGENT";
  const sourceLabel = post ? post.source.toUpperCase() : "HYBRID";

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-[#ff00ff]/20 bg-black/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#ff00ff] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_#ff00ff66] transition-all group-hover:shadow-[0_0_25px_#ff00ff]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase group-hover:text-[#ff00ff] transition-colors">
                blog<span className="text-[#ff00ff]/40">.pcstyle.dev</span>
              </h1>
              <p className="text-xs text-gray-600 uppercase tracking-[0.3em] font-mono">
                DEVELOPER_LOG_PROTOCOL
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-gray-500 font-mono uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SYSTEM_ONLINE
            </span>
            <span>v0.1.0</span>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1 bg-[#ff00ff]/10 border border-[#ff00ff]/30 text-[#ff00ff] text-xs font-mono uppercase tracking-[0.3em]">
              DEVLOG_ENTRY
            </span>
            <span className="text-xs text-gray-600 uppercase tracking-[0.4em] font-mono">
              {displaySlug}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            <span className="text-white">{title}</span>
          </h2>

          <p className="text-gray-400 max-w-2xl font-mono text-sm md:text-base leading-relaxed">
            {summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            <StatusChip label={authorLabel} tone="magenta" />
            <StatusChip label={`SOURCE_${sourceLabel}`} tone="cyan" />
            <StatusChip label={`PUBLISHED_${formatDate(createdAt)}`} tone="neutral" />
            <StatusChip label={`UPDATED_${formatDate(updatedAt)}`} tone="neutral" />
          </div>

          <div className="flex flex-wrap gap-6 pt-6 text-xs uppercase tracking-[0.3em] text-gray-600 font-mono">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#ff00ff]" />
              MDX_ENABLED
            </span>
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#ff00ff]" />
              CONVEX_BACKEND
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <article className="max-w-3xl mx-auto border border-[#ff00ff]/10 bg-black/50 backdrop-blur-sm px-6 py-10 md:px-10 md:py-12">
          <CustomMDX source={content} />
        </article>
      </section>

      <footer className="py-12 px-6 border-t border-[#ff00ff]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] text-[#ff00ff] font-black uppercase tracking-[0.5em] opacity-30">
              © 2026 pcstyle.dev
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
    </main>
  );
}
