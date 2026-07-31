import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TabTell 路线图",
  description: "查看 TabTell 已完成的首发工作、接下来和持续维护的产品方向。",
};

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return children;
}
