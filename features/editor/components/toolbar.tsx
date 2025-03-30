import { ActiveTool, Editor } from "../types"
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { ArrowDown, ArrowUp } from "lucide-react";
import { isTextType } from "../utils";

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
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  // @ts-expect-error
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);

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
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke color" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeActiveTool("stroke-color")}
              variant="ghost"
              size="icon"
              className={cn(
                activeTool === "stroke-color" && "bg-gray-100"
              )}
            >
              <div className="rounded-sm size-4 border-2 bg-white" style={{
                borderColor: strokeColor
              }}>

              </div>
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke width" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeActiveTool("stroke-width")}
              variant="ghost"
              size="icon"
              className={cn(
                activeTool === "stroke-width" && "bg-gray-100"
              )}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bring foward" side="bottom" sideOffset={5}>
          <Button 
            onClick={() => editor?.bringForward()}
            variant="ghost"
            size="icon"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send backwards" side="bottom" sideOffset={5}>
          <Button 
            onClick={() => editor?.sendBackwards()}
            variant="ghost"
            size="icon"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button 
            onClick={() => onChangeActiveTool("opacity")}
            variant="ghost"
            size="icon"
            className={cn(
              activeTool === "opacity" && "bg-gray-100"
            )}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  )
}