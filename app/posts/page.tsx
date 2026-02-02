import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BlogFooter } from "@/components/BlogFooter";
import { BlogHeader } from "@/components/BlogHeader";
import { StatusChip } from "@/components/mdx/StatusChip";
import { fallbackPosts } from "@/content/posts";

export const revalidate = 0;

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function PostsPage() {
  const posts = await fetchQuery(api.posts.listPosts);
  const items = posts && posts.length > 0 ? posts : fallbackPosts;

  return (
    <main className="min-h-screen bg-black text-white">
      <BlogHeader />

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1 bg-[#ff00ff]/10 border border-[#ff00ff]/30 text-[#ff00ff] text-xs font-mono uppercase tracking-[0.3em]">
              POST_ARCHIVE
            </span>
            <Link
              href="/"
              className="text-xs text-gray-600 uppercase tracking-[0.4em] font-mono hover:text-white"
            >
              BACK_TO_LATEST
            </Link>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            DEVLOG_INDEX
          </h2>
          <p className="text-gray-500 font-mono text-sm max-w-2xl">
            Every post in the human + AI timeline. Select a slug to read the full report.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid gap-6">
          {items.length === 0 && (
            <div className="border border-[#ff00ff]/20 bg-black/50 px-6 py-10 text-center text-gray-500 font-mono text-sm">
              NO_POSTS_FOUND
            </div>
          )}
          {items.map((post) => {
            const authorLabel = post.authorType === "human" ? "PCSTYLE" : "AI AGENT";
            const sourceLabel = post.source.toUpperCase();
            const summary = post.summary ?? "No summary provided.";

            return (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group border border-[#ff00ff]/15 bg-black/50 backdrop-blur-sm px-6 py-6 hover:border-[#ff00ff]/40 transition"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <StatusChip label={authorLabel} tone="magenta" />
                  <StatusChip label={`SOURCE_${sourceLabel}`} tone="cyan" />
                  <StatusChip label={`PUBLISHED_${formatDate(post.createdAt)}`} tone="neutral" />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#ff00ff] transition">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm font-mono mt-3 leading-relaxed">
                  {summary}
                </p>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-700 font-mono mt-4 inline-block">
                  {post.slug}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <BlogFooter />
    </main>
  );
}
