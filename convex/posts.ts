import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const AUTHOR_TYPE = v.union(v.literal("human"), v.literal("agent"));
const SOURCE_TYPE = v.union(
  v.literal("api"),
  v.literal("markdown"),
  v.literal("cli"),
);

export const upsertPost = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    summary: v.optional(v.string()),
    content: v.string(),
    authorType: AUTHOR_TYPE,
    source: SOURCE_TYPE,
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        title: args.title,
        summary: args.summary,
        content: args.content,
        authorType: args.authorType,
        source: args.source,
        updatedAt: now,
      });

      return { id: existing._id, slug: args.slug, updated: true };
    }

    const id = await ctx.db.insert("posts", {
      slug: args.slug,
      title: args.title,
      summary: args.summary,
      content: args.content,
      authorType: args.authorType,
      source: args.source,
      createdAt: now,
      updatedAt: now,
    });

    return { id, slug: args.slug, created: true };
  },
});

export const getPostBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const listPosts = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("posts")
      .withIndex("by_createdAt")
      .order("desc")
      .take(20);
  },
});
