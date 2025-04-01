import { cn } from "@/lib/utils";
import { ActiveTool, Editor, filters, fonts } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const FilterSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: FilterSidebarProps) => {

  const onClose = () => {
    onChangeActiveTool("select");
  }

  return (
    <aside className={cn(
      "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
      activeTool === "filter" ? "visible" : "hidden"
    )}>
      <ToolSidebarHeader title="Filters" description="Apply a filter to your image" />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className="w-full h-16 justify-start text-left"
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}