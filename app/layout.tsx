import type { Metadata } from "next";
import "./globals.css";

const origin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tabtell.imzh.me"
).replace(/\/$/, "");
const title = "TabTell — 打开网页，直接开聊";
const description =
  "把当前网页变成一段连续的 AI 对话。支持逐页上下文、快捷处理、模型切换、Skills、原文导出与本地数据管理。";

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
        alt: "TabTell — 打开网页，直接开聊",
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
