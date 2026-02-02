import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    slug: v.string(),
    title: v.string(),
    summary: v.optional(v.string()),
    content: v.string(),
    authorType: v.union(v.literal("human"), v.literal("agent")),
    source: v.union(v.literal("api"), v.literal("markdown"), v.literal("cli")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_createdAt", ["createdAt"]),
});
