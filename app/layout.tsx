import type { Metadata } from "next";
import "./globals.css";

const origin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tabtell.imzh.me"
).replace(/\/$/, "");
const title = "TabTell — Ask the current page";
const description =
  "Turn the webpage in your current tab into a focused, continuous AI conversation.";

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title,
  description,
  icons: {
    icon: `${origin}/favicon.png`,
    shortcut: `${origin}/favicon.png`,
  },
  openGraph: {
    type: "website",
    url: origin,
    title,
    description,
    siteName: "TabTell",
    images: [
      {
        url: `${origin}/og.png`,
        width: 1200,
        height: 630,
        alt: "TabTell — Ask the current page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${origin}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
