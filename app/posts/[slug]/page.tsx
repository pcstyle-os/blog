import path from "node:path";
import { readFile } from "node:fs/promises";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BlogFooter } from "@/components/BlogFooter";
import { BlogHeader } from "@/components/BlogHeader";
import { CustomMDX } from "@/components/mdx/CustomMDX";
import { StatusChip } from "@/components/mdx/StatusChip";
import { fallbackPosts } from "@/content/posts";

export const revalidate = 0;

async function loadFallbackContent(file: string) {
  const filePath = path.join(process.cwd(), "content", file);
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = await fetchQuery(api.posts.getPostBySlug, { slug });
  const fallback = fallbackPosts.find((item) => item.slug === slug) ?? null;

  const content =
    post?.content ?? (fallback ? await loadFallbackContent(fallback.file) : null);
  if (!content) {
    return notFound();
  }

  const title = post?.title ?? fallback?.title ?? slug.toUpperCase();
  const summary = post?.summary ?? fallback?.summary ?? "";
  const createdAt = post?.createdAt ?? fallback?.createdAt ?? Date.now();
  const updatedAt = post?.updatedAt ?? createdAt;
  const authorLabel =
    (post?.authorType ?? fallback?.authorType) === "human" ? "PCSTYLE" : "AI AGENT";
  const sourceLabel = (post?.source ?? fallback?.source ?? "markdown").toUpperCase();

  return (
    <main className="min-h-screen bg-black text-white">
      <BlogHeader />

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1 bg-[#ff00ff]/10 border border-[#ff00ff]/30 text-[#ff00ff] text-xs font-mono uppercase tracking-[0.3em]">
              DEVLOG_ENTRY
            </span>
            <Link
              href="/posts"
              className="text-xs text-gray-600 uppercase tracking-[0.4em] font-mono hover:text-white"
            >
              BACK_TO_ARCHIVE
            </Link>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            {title}
          </h2>

          {summary && (
            <p className="text-gray-500 font-mono text-sm max-w-2xl leading-relaxed">
              {summary}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-4">
            <StatusChip label={authorLabel} tone="magenta" />
            <StatusChip label={`SOURCE_${sourceLabel}`} tone="cyan" />
            <StatusChip label={`PUBLISHED_${formatDate(createdAt)}`} tone="neutral" />
            <StatusChip label={`UPDATED_${formatDate(updatedAt)}`} tone="neutral" />
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
