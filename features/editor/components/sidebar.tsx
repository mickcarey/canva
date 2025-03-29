"use client";

import { SidebarItem } from "@/features/editor/components/sidebar-item";
import { 
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Settings,
  Shapes,
  Sparkles,
  Type
} from "lucide-react";
import { ActiveTool } from "@/features/editor/types";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        <SidebarItem label="Design" icon={LayoutTemplate} onClick={() => onChangeActiveTool("templates")} isActive={activeTool === "templates"} />
        <SidebarItem label="Image" icon={ImageIcon} onClick={() => onChangeActiveTool("images")} isActive={activeTool === "images"} />
        <SidebarItem label="Text" icon={Type} onClick={() => onChangeActiveTool("text")} isActive={activeTool === "text"} />
        <SidebarItem label="Shapes" icon={Shapes} onClick={() => onChangeActiveTool("shapes")} isActive={activeTool === "shapes"} />
        <SidebarItem label="AI" icon={Sparkles} onClick={() => onChangeActiveTool("ai")} isActive={activeTool === "ai"} />
        <SidebarItem label="Settings" icon={Settings} onClick={() => onChangeActiveTool("settings")} isActive={activeTool === "settings"} />
      </ul>
    </aside>
  )

}