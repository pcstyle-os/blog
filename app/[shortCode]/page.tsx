import { redirect, notFound } from "next/navigation";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface PageProps {
    params: Promise<{ shortCode: string }>;
}

export default async function RedirectPage({ params }: PageProps) {
    const { shortCode } = await params;

    // Get the link from Convex
    const link = await fetchQuery(api.links.getLinkByShortCode, { shortCode });

    if (!link) {
        notFound();
    }

    // Increment click count (fire and forget)
    fetchMutation(api.links.incrementClicks, { shortCode }).catch(() => {
        // Ignore errors on click tracking
    });

    // Redirect to the original URL
    redirect(link.url);
}

export async function generateMetadata({ params }: PageProps) {
    const { shortCode } = await params;

    return {
        title: `Redirecting... | s.pcstyle.dev/${shortCode}`,
        robots: "noindex",
    };
}
