import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TabTell 使用指南 — 从安装到第一次对话",
  description:
    "从安装、连接模型到网页对话、快捷处理、Skills、原文导出与配置迁移，一步步学会使用 TabTell。",
};

export default function GuideLayout({ children }: { children: ReactNode }) {
  return children;
}
