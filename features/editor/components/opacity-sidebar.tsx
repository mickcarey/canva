import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";

interface OpacitySidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const OpacitySidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: OpacitySidebarProps) => {
  const initialValue = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);
  const [opacity, setOpacity] = useState(initialValue);

  useEffect(() => {
    if (selectedObject) {
      // @ts-expect-error
      setOpacity(selectedObject.get('opacity'));
    }
  }, [selectedObject])
  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  }

  return (
    <aside className={cn(
      "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
      activeTool === "opacity" ? "visible" : "hidden"
    )}>
      <ToolSidebarHeader title="Opacity" description="Change the opacity of the selected object" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">
            Opacity
          </Label>
          <Slider 
            value={[opacity]} 
            max={1}
            min={0}
            step={0.01}
            onValueChange={(values) => onChange(values[0])}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}