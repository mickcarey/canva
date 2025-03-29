"use client";

import { SidebarItem } from "@/features/editor/components/sidebar-item";
import { LayoutTemplate } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        <SidebarItem label="Design" icon={LayoutTemplate} onClick={() => {}} />
      </ul>
    </aside>
  )

}