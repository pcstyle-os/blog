import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const SOURCE_VALUES = new Set(["api", "markdown", "cli"]);
const AUTHOR_VALUES = new Set(["human", "agent"]);

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeSource(
  value: string | null,
  fallback: "api" | "markdown" | "cli",
) {
  if (value && SOURCE_VALUES.has(value)) return value as "api" | "markdown" | "cli";
  return fallback;
}

function normalizeAuthorType(
  value: string | null,
  fallback: "human" | "agent",
) {
  if (value && AUTHOR_VALUES.has(value)) return value as "human" | "agent";
  return fallback;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let title: string | null = null;
  let summary: string | null = null;
  let slug: string | null = null;
  let authorType: "human" | "agent" = "human";
  let source: "api" | "markdown" | "cli" = "api";
  let content: string | null = null;

  if (contentType.includes("application/json")) {
    const body = await request.json();
    title = typeof body.title === "string" ? body.title : null;
    summary = typeof body.summary === "string" ? body.summary : null;
    slug = typeof body.slug === "string" ? body.slug : null;
    content = typeof body.content === "string" ? body.content : null;
    authorType = normalizeAuthorType(
      typeof body.authorType === "string" ? body.authorType : null,
      "human",
    );
    source = normalizeSource(
      typeof body.source === "string" ? body.source : null,
      "api",
    );
  } else {
    const formData = await request.formData();
    title =
      typeof formData.get("title") === "string"
        ? (formData.get("title") as string)
        : null;
    summary =
      typeof formData.get("summary") === "string"
        ? (formData.get("summary") as string)
        : null;
    slug =
      typeof formData.get("slug") === "string"
        ? (formData.get("slug") as string)
        : null;

    const author =
      typeof formData.get("authorType") === "string"
        ? (formData.get("authorType") as string)
        : null;
    const sourceValue =
      typeof formData.get("source") === "string"
        ? (formData.get("source") as string)
        : null;
    authorType = normalizeAuthorType(author, "human");
    source = normalizeSource(sourceValue, "markdown");

    const file = formData.get("file");
    if (file instanceof File) {
      content = await file.text();
      if (!title) {
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        title = baseName || null;
      }
    } else if (typeof formData.get("content") === "string") {
      content = formData.get("content") as string;
    }
  }

  if (!title || !content) {
    return new Response(
      "Missing title or content. Provide JSON with title/content or multipart form-data with title/file.",
      { status: 400 },
    );
  }

  const normalizedSlug = slugify(slug || title);
  if (!normalizedSlug) {
    return new Response("Unable to generate a valid slug.", { status: 400 });
  }

  const result = await fetchMutation(api.posts.upsertPost, {
    slug: normalizedSlug,
    title,
    summary: summary ?? undefined,
    content,
    authorType,
    source,
  });

  return Response.json({
    success: true,
    result,
    slug: normalizedSlug,
  });
}
