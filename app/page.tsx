import path from "node:path";
import { readFile } from "node:fs/promises";
import Link from "next/link";
import { Cpu, FileText } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { CustomMDX } from "@/components/mdx/CustomMDX";
import { StatusChip } from "@/components/mdx/StatusChip";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogFooter } from "@/components/BlogFooter";
import { fallbackPosts } from "@/content/posts";

const DEFAULT_POST = fallbackPosts[0];

export const revalidate = 0;

async function loadFallbackContent(slug: string, file: string) {
  const filePath = path.join(process.cwd(), "content", file);
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return `## ME MYSELF\nMissing fallback content for ${slug}.`;
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
  const post = await fetchQuery(api.posts.getPostBySlug, { slug: DEFAULT_POST.slug });
  const content =
    post?.content ?? (await loadFallbackContent(DEFAULT_POST.slug, DEFAULT_POST.file));
  const title = post?.title ?? DEFAULT_POST.title;
  const summary = post?.summary ?? DEFAULT_POST.summary;
  const createdAt = post?.createdAt ?? DEFAULT_POST.createdAt;
  const updatedAt = post?.updatedAt ?? createdAt;
  const displaySlug = post?.slug ?? DEFAULT_POST.slug;

  const authorLabel = post
    ? post.authorType === "human"
      ? "PCSTYLE"
      : "AI AGENT"
    : "PCSTYLE + AI AGENT";
  const sourceLabel = post ? post.source.toUpperCase() : "HYBRID";

  return (
    <main className="min-h-screen bg-black text-white">
      <BlogHeader />

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
            <Link
              href="/posts"
              className="border border-[#ff00ff]/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#ff00ff] hover:bg-[#ff00ff]/10 transition"
            >
              VIEW_ALL_POSTS
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <article className="max-w-3xl mx-auto border border-[#ff00ff]/10 bg-black/50 backdrop-blur-sm px-6 py-10 md:px-10 md:py-12">
          <CustomMDX source={content} />
        </article>
      </section>

      <BlogFooter />
    </main>
  );
}
