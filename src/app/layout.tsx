import type { Metadata } from "next";
import { Urbanist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Korkoe Dumashie — React/Laravel Software Engineer",
  description:
    "Portfolio of Korkoe Anthony Kwami Dumashie — Software Engineer specializing in React, Next.js, and Laravel, building modern web applications from Accra, Ghana.",
  keywords: [
    "Korkoe Dumashie",
    "Software Engineer",
    "React",
    "Laravel",
    "Next.js",
    "Full Stack Developer",
    "Ghana",
  ],
  authors: [{ name: "Korkoe Anthony Kwami Dumashie" }],
  icons: {
    icon: "/images/avatar-light.webp",
  },
  openGraph: {
    title: "Korkoe Dumashie — Software Engineer",
    description:
      "React/Laravel Software Engineer building modern web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
