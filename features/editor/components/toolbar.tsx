import { ActiveTool, Editor, FONT_SIZE, FONT_STYLE, FONT_WEIGHT } from "../types"
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown, Copy, SquareSplitHorizontal, Trash } from "lucide-react";
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { TbColorFilter } from "react-icons/tb";
import { useState } from "react";
import { FontSizeInput } from "./font-size-input";

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
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle() || FONT_STYLE;
  const initialFontLinethrough = editor?.getActiveFontLinethrough() || false;
  const initialFontUnderline = editor?.getActiveFontUnderline() || false;
  const initialTextAlignment = editor?.getActiveTextAlignment() || "left";
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    fontWeight: initialFontWeight,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlignment: initialTextAlignment,
    fontSize: initialFontSize
  });

  // @ts-expect-error
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const selectedObject = editor?.selectedObjects[0];

  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value
    }))
  }

  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((current) => ({ 
      ...current,
      fontWeight: newValue 
    }));
  }

  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";
    editor?.changeFontStyle(newValue);
    setProperties((current) => ({ 
      ...current,
      fontStyle: newValue 
    }));
  }

  const toggleLinethrough = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontLinethrough ? false: true;
    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({ 
      ...current,
      fontLinethrough: newValue 
    }));
  }

  const toggleUnderline = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontUnderline ? false: true;
    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({ 
      ...current,
      fontUnderline: newValue 
    }));
  }

  const onChangeTextAlignment = (value: string) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeTextAlignment(value);
    setProperties((current) => ({ 
      ...current,
      textAlignment: value
    }));
  }

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    )
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {!isImage && (
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
                backgroundColor: properties.fillColor
              }}>

              </div>
            </Button>
          </Hint>
        </div>
      )}
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
                borderColor: properties.strokeColor
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
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeActiveTool("font")}
              variant="ghost"
              size="icon"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button 
              onClick={toggleBold}
              variant="ghost"
              size="icon"
              className={cn(
                properties.fontWeight > 500 && "bg-gray-100"
              )}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button 
              onClick={toggleItalic}
              variant="ghost"
              size="icon"
              className={cn(
                properties.fontStyle === "italic" && "bg-gray-100"
              )}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button 
              onClick={toggleUnderline}
              variant="ghost"
              size="icon"
              className={cn(
                properties.fontUnderline && "bg-gray-100"
              )}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Strike" side="bottom" sideOffset={5}>
            <Button 
              onClick={toggleLinethrough}
              variant="ghost"
              size="icon"
              className={cn(
                properties.fontLinethrough && "bg-gray-100"
              )}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Left alignment" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeTextAlignment("left")}
              variant="ghost"
              size="icon"
              className={cn(
                properties.textAlignment === "left" && "bg-gray-100"
              )}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Center alignment" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeTextAlignment("center")}
              variant="ghost"
              size="icon"
              className={cn(
                properties.textAlignment === "center" && "bg-gray-100"
              )}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Right alignment" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeTextAlignment("right")}
              variant="ghost"
              size="icon"
              className={cn(
                properties.textAlignment === "right" && "bg-gray-100"
              )}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Filters" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeActiveTool("filter")}
              variant="ghost"
              size="icon"
              className={cn(
                activeTool === "filter" && "bg-gray-100"
              )}
            >
              <TbColorFilter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Remove background" side="bottom" sideOffset={5}>
            <Button 
              onClick={() => onChangeActiveTool("remove-bg")}
              variant="ghost"
              size="icon"
              className={cn(
                activeTool === "remove-bg" && "bg-gray-100"
              )}
            >
              <SquareSplitHorizontal className="size-4" />
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
      <div className="flex items-center h-full justify-center">
        <Hint label="Duplicate" side="bottom" sideOffset={5}>
          <Button 
            onClick={() => {
              editor?.onCopy();
              setTimeout(() => editor?.onPaste(), 0);
            }}
            variant="ghost"
            size="icon"
          >
            <Copy className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button 
            onClick={() => editor?.delete()}
            variant="ghost"
            size="icon"
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  )
}