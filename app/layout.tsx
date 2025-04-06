import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Roopsagar K | Full-Stack Developer & AI Enthusiast",
    template: "%s | Roopsagar K",
  },
  metadataBase: new URL("https://roopsagar.tech/"),
  description:
    "Explore my portfolio showcasing innovative projects in AI, full-stack development, and web applications. Passionate about building scalable and efficient solutions.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  keywords: [
    "Roopsagar K",
    "full-stack developer",
    "AI enthusiast",
    "Next.js developer",
    "React developer",
    "SaaS developer",
    "software engineer",
    "portfolio",
    "web development",
    "open-source contributions",
    "AI projects",
  ],
  appleWebApp: {
    title: "Roopsagar K",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/favicon-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/favicon-512x512.png",
        sizes: "512x512",
      },
      {
        rel: "shortcut icon",
        url: "/favicons/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
