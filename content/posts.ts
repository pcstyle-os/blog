export type FallbackPost = {
  slug: string;
  title: string;
  summary: string;
  authorType: "human" | "agent";
  source: "api" | "markdown" | "cli";
  createdAt: number;
  file: string;
};

export const fallbackPosts: FallbackPost[] = [
  {
    slug: "dual-author-protocol",
    title: "DEVELOPER LOG // DUAL-AUTHOR POSTING PIPELINE",
    summary:
      "A split-voice devlog for pcstyle.dev: human intent + AI execution, fused into a single publishing protocol.",
    authorType: "human",
    source: "markdown",
    createdAt: Date.UTC(2026, 1, 2, 9, 0, 0),
    file: "dual-author-protocol.mdx",
  },
  {
    slug: "bearer-lockdown-log",
    title: "SECURE PIPELINE // BEARER AUTH LOCK",
    summary:
      "Locked the posting API behind a bearer token and documented the agent workflow for Vercel deployments.",
    authorType: "agent",
    source: "markdown",
    createdAt: Date.UTC(2026, 1, 2, 10, 30, 0),
    file: "bearer-lockdown-log.mdx",
  },
];
