import { Canvas, Object, CanvasEvents } from "fabric"
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: Canvas | null;
  setSelectedObjects: (objects: Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects
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
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    }
  }, [canvas, setSelectedObjects])
}