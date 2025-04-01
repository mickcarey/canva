import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import React, { useState } from "react";

interface AiSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const AiSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: AiSidebarProps) => {
  const mutation = useGenerateImage();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ prompt: value }, {
      onSuccess: ({ data }) => {
        editor?.addImage(data);
      }
    });
  }

  const onClose = () => {
    onChangeActiveTool("select");
  }

  return (
    <aside className={cn(
      "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
      activeTool === "ai" ? "visible" : "hidden"
    )}>
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <form onSubmit={onSubmit} className="p-4 space-y-6">
          <Textarea 
            placeholder='a cyberpunk cat with a neon sign that says "Sana"'
            cols={30}
            rows={10}
            required
            minLength={3}
            disabled={mutation.isPending}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full"
          >
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
