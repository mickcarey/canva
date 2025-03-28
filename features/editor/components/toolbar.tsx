import { useState } from "react";
import { ActiveTool, Editor } from "../types"
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: ToolbarProps) => {
  const fillColor = editor?.fillColor;

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    )
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="Colour" side="bottom" sideOffset={5}>
          <Button 
            onClick={() => onChangeActiveTool("fill")}
            variant="ghost"
            size="icon"
            className={cn(
              activeTool === "fill" && "bg-gray-100"
            )}
          >
            <div className="rounded-sm size-4 border" style={{
              backgroundColor: fillColor
            }}>

            </div>
          </Button>
        </Hint>
      </div>
    </div>
  )
}