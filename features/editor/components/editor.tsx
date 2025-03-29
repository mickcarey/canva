"use client";

import { Canvas } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { Footer } from "@/features/editor/components/footer";
import { ActiveTool } from "@/features/editor/types";
import { ShapeSidebar } from "./shape-sidebar";
import { FillColorSidebar } from "./fill-color-sidebar";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback((tool: ActiveTool) => {
    if (tool === activeTool) {
      return setActiveTool("select");
    }

    if (tool === "draw") {
      // TODO: Enable draw mode
    }

    if (activeTool === "draw") {
      // TODO: disable draw mode
    }

    setActiveTool(tool);
  }, [activeTool]);

  const { init, editor } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = new Canvas(
      // @ts-expect-error
      canvasRef.current,
      {
        controlsAboveOverlay: true,
        preserveObjectStacking: true
      }
    );

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!
    });

    return () => {
      canvas.dispose();
    }
  }, [init])

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <ShapeSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <FillColorSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} key={JSON.stringify(editor?.canvas.getActiveObject())} />
          <div className="flex-1 h-[calc(100%-124px)] bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}