import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { NeuralCursor } from "@/components/ui/NeuralCursor";
import { CRTOverlay } from "@/components/ui/CRTOverlay";
import { MatrixBackground } from "@/components/ui/MatrixBackground";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "S.PCSTYLE // LINK_SHORTENER",
  description: "Cybernetic URL Compression Protocol - pcstyle",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "S.PCSTYLE // LINK_SHORTENER",
    description: "Cybernetic URL Compression Protocol - pcstyle",
    url: "https://s.pcstyle.dev",
    siteName: "S.PCSTYLE",
    images: [
      {
        url: "https://og.pcstyle.dev/api/og?title=LINK%20SHORTENER&subtitle=Cybernetic%20URL%20Compression&icon=link&theme=magenta",
        width: 1200,
        height: 630,
        alt: "Link Shortener Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S.PCSTYLE // LINK_SHORTENER",
    description: "Cybernetic URL Compression Protocol - pcstyle",
    images: ["https://og.pcstyle.dev/api/og?title=LINK%20SHORTENER&subtitle=Cybernetic%20URL%20Compression&icon=link&theme=magenta"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased bg-black`}>
        <ConvexClientProvider>
          <MatrixBackground />
          <CRTOverlay />
          <div className="relative z-10">{children}</div>
          <NeuralCursor />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
