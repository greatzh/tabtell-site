import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TabTell 更新日志",
  description: "查看 TabTell 各版本新增、优化和修复的内容。",
};

export default function ChangelogLayout({ children }: { children: ReactNode }) {
  return children;
}
