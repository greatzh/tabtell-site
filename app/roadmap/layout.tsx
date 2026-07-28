import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TabTell 正在开发",
  description: "查看 TabTell 正在进行、接下来和持续维护的产品方向。",
};

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return children;
}
