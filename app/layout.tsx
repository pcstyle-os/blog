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
  title: "PCSTYLE.DEV // DEVLOG",
  description: "Developer log for pcstyle.dev — human + AI collaboration notes.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "PCSTYLE.DEV // DEVLOG",
    description: "Developer log for pcstyle.dev — human + AI collaboration notes.",
    url: "https://blog.pcstyle.dev",
    siteName: "PCSTYLE.DEV",
    images: [
      {
        url: "https://og.pcstyle.dev/api/og?title=DEVLOG&subtitle=Dual%20Author%20Protocol&icon=terminal&theme=magenta",
        width: 1200,
        height: 630,
        alt: "PCSTYLE Devlog Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PCSTYLE.DEV // DEVLOG",
    description: "Developer log for pcstyle.dev — human + AI collaboration notes.",
    images: ["https://og.pcstyle.dev/api/og?title=DEVLOG&subtitle=Dual%20Author%20Protocol&icon=terminal&theme=magenta"],
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
