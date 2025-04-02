import { Canvas, Object, CanvasEvents } from "fabric"
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: Canvas | null;
  setSelectedObjects: (objects: Object[]) => void;
  clearSelectionCallback?: () => void;
  save: () => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
  save
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", (e) => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
      canvas.on("object:added", () => save())
      canvas.on("object:modified", () => save())
      canvas.on("object:removed", () => save())
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
        canvas.off("object:added");
        canvas.off("object:modified");
        canvas.off("object:removed");
      }
    }
  }, [canvas, setSelectedObjects, clearSelectionCallback, save])
}