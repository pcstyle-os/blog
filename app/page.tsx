import { LinkShortener } from "@/components/LinkShortener";
import { Link, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-[#ff00ff]/20 bg-black/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#ff00ff] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_#ff00ff66] transition-all group-hover:shadow-[0_0_25px_#ff00ff]">
              <Link className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase group-hover:text-[#ff00ff] transition-colors">
                s<span className="text-[#ff00ff]/40">.pcstyle.dev</span>
              </h1>
              <p className="text-xs text-gray-600 uppercase tracking-[0.3em] font-mono">
                URL_COMPRESSION_PROTOCOL
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-gray-500 font-mono uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SYSTEM_ONLINE
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <span className="px-4 py-1 bg-[#ff00ff]/10 border border-[#ff00ff]/30 text-[#ff00ff] text-xs font-mono uppercase tracking-[0.3em] rounded-full">
              FAST • SECURE • PERMANENT
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            <span className="text-white">SHORTEN</span>
            <br />
            <span className="text-[#ff00ff]">ANY LINK</span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto font-mono text-sm leading-relaxed">
            Transform long URLs into compact, shareable links with our
            high-performance URL compression protocol. Real-time analytics
            included.
          </p>
        </div>
      </section>

      {/* Link Shortener */}
      <section className="px-6 pb-20">
        <LinkShortener />
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-[#ff00ff]/10">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center text-xs text-gray-600 uppercase tracking-[0.5em] mb-12 font-mono">
            PROTOCOL_CAPABILITIES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "INSTANT REDIRECT",
                description:
                  "Sub-millisecond redirects powered by edge computing and global CDN.",
              },
              {
                icon: Shield,
                title: "SECURE LINKS",
                description:
                  "All links are encrypted and protected against malicious tampering.",
              },
              {
                icon: Globe,
                title: "GLOBAL REACH",
                description:
                  "Links work worldwide with 99.9% uptime guaranteed across all regions.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 bg-black/50 border border-[#ff00ff]/20 rounded-lg backdrop-blur-sm hover:border-[#ff00ff]/50 transition-all group"
              >
                <div className="p-3 bg-[#ff00ff]/10 rounded-lg w-fit mb-4 group-hover:bg-[#ff00ff]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#ff00ff]" />
                </div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-sm font-mono leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#ff00ff]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] text-[#ff00ff] font-black uppercase tracking-[0.5em] opacity-30">
              © 2025 pcstyle.dev
            </p>
            <span className="text-[10px] text-gray-800 uppercase tracking-widest font-mono">
              PROTOCOL_RESERVED: SHORT-777-ALPHA
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
