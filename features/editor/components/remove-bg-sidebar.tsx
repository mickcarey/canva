import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { useRemoveBackground } from "@/features/ai/api/use-remove-background";

interface RemoveBgSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const RemoveBgSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: RemoveBgSidebarProps) => {
  const mutation = useRemoveBackground();
  const selectedObject = editor?.selectedObjects[0];

  // @ts-expect-error originalElement exists on object
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onClick =() => {
    mutation.mutate({ image: imageSrc }, {
      onSuccess: ({ data }) => {
        editor?.addImage(data);
      }
    })
  }

  return (
    <aside className={cn(
      "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
      activeTool === "remove-bg" ? "visible" : "hidden"
    )}>
      <ToolSidebarHeader title="Background removal" description="Remove background from image using AI" />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature not available for this object
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div className={cn(
              "relative aspect-square rounded-md overflow-hidden transition bg-muted",
              mutation.isPending && "opacity-50"
            )}>
              <Image
                src={imageSrc}
                fill
                alt="Image"
                className="object-cover w-full"
              />
            </div>
            <Button disabled={mutation.isPending} onClick={onClick} className="w-full">
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
