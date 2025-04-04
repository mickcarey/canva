"use client";

import { Canvas } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { Footer } from "@/features/editor/components/footer";
import { ActiveTool, selectionDependentTools } from "@/features/editor/types";
import { ShapeSidebar } from "./shape-sidebar";
import { FillColorSidebar } from "./fill-color-sidebar";
import { StrokeColorSidebar } from "./stroke-color-sidebar";
import { StrokeWidthSidebar } from "./stroke-width-sidebar";
import { OpacitySidebar } from "./opacity-sidebar";
import { TextSidebar } from "./text-sidebar";
import { FontSidebar } from "./font-sidebar";
import { ImageSidebar } from "./image-sidebar";
import { FilterSidebar } from "./filter-sidebar";
import { AiSidebar } from "./ai-sidebar";
import { RemoveBgSidebar } from "./remove-bg-sidebar";
import { DrawSidebar } from "./draw-sidebar";
import { SettingsSidebar } from "./settings-sidebar";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection
  });

  const onChangeActiveTool = useCallback((tool: ActiveTool) => {
    if (tool === "draw") {
      editor?.enableDrawingMode();
    }

    if (activeTool === "draw") {
      editor?.disableDrawingMode();
    }

    if (tool === activeTool) {
      return setActiveTool("select");
    }

    setActiveTool(tool);
  }, [activeTool, editor]);


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
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <ShapeSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <FillColorSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <StrokeColorSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <StrokeWidthSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <OpacitySidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <TextSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <FontSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <ImageSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <FilterSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <AiSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <RemoveBgSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <DrawSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <SettingsSidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} key={JSON.stringify(editor?.canvas.getActiveObject())} />
          <div className="flex-1 h-[calc(100%-124px)] bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  )
}