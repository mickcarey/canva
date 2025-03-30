import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const TextSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: TextSidebarProps) => {

  const onClose = () => {
    onChangeActiveTool("select");
  }

  return (
    <aside className={cn(
      "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
      activeTool === "text" ? "visible" : "hidden"
    )}>
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button className="w-full" onClick={() => editor?.addText("Hello World")}>
            Add a textbox
          </Button>
          <Button variant="secondary" size="lg" className="w-full h-16" onClick={() => editor?.addText("Heading", {
            fontSize: 80,
            fontWeight: 700
          })}>
            <span className="text-2xl font-bold">
              Add a heading
            </span>
          </Button>
          <Button variant="secondary" size="lg" className="w-full h-16" onClick={() => editor?.addText("Subheading", {
            fontSize: 44,
            fontWeight: 600
          })}>
            <span className="text-xl font-semibold">
              Add a subheading
            </span>
          </Button>
          <Button variant="secondary" size="lg" className="w-full h-16" onClick={() => editor?.addText("Paragraph", {
            fontSize: 32,
          })}>
            <span className="">
              Add a paragraph
            </span>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}