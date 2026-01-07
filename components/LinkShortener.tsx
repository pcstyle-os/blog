"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    Link as LinkIcon,
    Copy,
    Check,
    ExternalLink,
    Loader2,
    AlertCircle,
    BarChart3,
    Zap,
} from "lucide-react";

export const LinkShortener = () => {
    const [url, setUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [showCustom, setShowCustom] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [createdLink, setCreatedLink] = useState<{
        shortCode: string;
        shortUrl: string;
    } | null>(null);

    const createLink = useMutation(api.links.createLink);
    const recentLinks = useQuery(api.links.getRecentLinks);
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setCreatedLink(null);

        if (!url.trim()) {
            setError("Please enter a URL");
            return;
        }

        // Auto-add https if no protocol
        let processedUrl = url.trim();
        if (!/^https?:\/\//i.test(processedUrl)) {
            processedUrl = "https://" + processedUrl;
        }

        setIsCreating(true);
        try {
            const result = await createLink({
                url: processedUrl,
                customAlias: showCustom && customAlias.trim() ? customAlias.trim() : undefined,
            });
            setCreatedLink(result);
            setUrl("");
            setCustomAlias("");
            setShowCustom(false);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to create short link");
        } finally {
            setIsCreating(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedUrl(text);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8">
            {/* Shortener Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div className="relative">
                    <div className="flex items-center gap-3 p-4 bg-black/50 border border-[#ff00ff]/30 rounded-lg backdrop-blur-xl focus-within:border-[#ff00ff] focus-within:shadow-[0_0_20px_#ff00ff44] transition-all">
                        <LinkIcon className="w-5 h-5 text-[#ff00ff] flex-shrink-0" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter your long URL here..."
                            className="flex-1 bg-transparent text-white placeholder-gray-600 outline-none font-mono text-sm"
                        />
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="px-6 py-2 bg-[#ff00ff] text-black font-bold uppercase tracking-wide text-sm transition-all hover:bg-white hover:shadow-[0_0_20px_#ff00ff] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                            {isCreating ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Zap className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Custom Alias Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setShowCustom(!showCustom)}
                        className={`text-xs uppercase tracking-wider font-mono transition-colors ${showCustom ? "text-[#ff00ff]" : "text-gray-600 hover:text-gray-400"
                            }`}
                    >
                        {showCustom ? "− HIDE CUSTOM" : "+ CUSTOM ALIAS"}
                    </button>
                </div>

                <AnimatePresence>
                    {showCustom && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex items-center gap-3 p-4 bg-black/30 border border-[#ff00ff]/20 rounded-lg">
                                <span className="text-gray-500 font-mono text-sm">
                                    s.pcstyle.dev/
                                </span>
                                <input
                                    type="text"
                                    value={customAlias}
                                    onChange={(e) => setCustomAlias(e.target.value)}
                                    placeholder="your-custom-alias"
                                    className="flex-1 bg-transparent text-white placeholder-gray-600 outline-none font-mono text-sm"
                                    pattern="^[a-zA-Z0-9_-]{3,20}$"
                                />
                            </div>
                            <p className="text-gray-700 text-xs mt-2 font-mono">
                                3-20 characters, alphanumeric, dashes, and underscores only
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.form>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-400 text-sm font-mono">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Created Link */}
            <AnimatePresence>
                {createdLink && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-6 bg-green-500/10 border border-green-500/50 rounded-lg space-y-4"
                    >
                        <div className="flex items-center gap-2 text-green-400 text-xs uppercase tracking-wider font-mono">
                            <Check className="w-4 h-4" />
                            LINK_CREATED_SUCCESSFULLY
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex-1 p-4 bg-black/50 border border-green-500/30 rounded-lg">
                                <p className="text-green-400 font-bold font-mono text-lg">
                                    {createdLink.shortUrl}
                                </p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(createdLink.shortUrl)}
                                className={`p-4 rounded-lg transition-all ${copiedUrl === createdLink.shortUrl
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-black/50 border border-green-500/30 text-green-500 hover:bg-green-500/10"
                                    }`}
                            >
                                {copiedUrl === createdLink.shortUrl ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recent Links */}
            {recentLinks && recentLinks.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    <h3 className="text-xs font-bold text-gray-600 uppercase tracking-[0.3em] font-mono">
                        RECENT_LINKS
                    </h3>

                    <div className="space-y-2">
                        {recentLinks.map((link, index) => (
                            <motion.div
                                key={link._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-4 p-4 bg-black/30 border border-[#ff00ff]/10 rounded-lg hover:border-[#ff00ff]/30 transition-colors group"
                            >
                                <div className="p-2 bg-[#ff00ff]/10 rounded-lg">
                                    <LinkIcon className="w-4 h-4 text-[#ff00ff]" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-[#ff00ff] font-mono text-sm font-bold">
                                        s.pcstyle.dev/{link.shortCode}
                                    </p>
                                    <p className="text-gray-600 text-xs font-mono truncate">
                                        {link.url}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-600 font-mono">
                                    <span className="flex items-center gap-1">
                                        <BarChart3 className="w-3 h-3" />
                                        {link.clicks}
                                    </span>
                                    <span className="hidden sm:block">
                                        {formatDate(link.createdAt)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() =>
                                            copyToClipboard(`https://s.pcstyle.dev/${link.shortCode}`)
                                        }
                                        className={`p-2 rounded-lg transition-all ${copiedUrl === `https://s.pcstyle.dev/${link.shortCode}`
                                                ? "bg-green-500/20 text-green-400"
                                                : "text-gray-500 hover:text-white hover:bg-white/10"
                                            }`}
                                    >
                                        {copiedUrl === `https://s.pcstyle.dev/${link.shortCode}` ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
