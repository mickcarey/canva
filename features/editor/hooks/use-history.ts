import { Canvas } from "fabric";
import { useCallback, useRef, useState } from "react";
import { JSON_KEYS } from "../types";

interface UseHistoryProps {
  canvas: Canvas | null;
}

export const useHistory = ({ canvas }: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef(false);

  const canUndo = useCallback(() => {
    return historyIndex > 0;

  }, [historyIndex])

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;

  }, [historyIndex])

  const save = useCallback((skip = false) => {
    if (!canvas) return;

    const currentState = canvas.toObject(JSON_KEYS);
    const json = JSON.stringify(currentState);

    if (!skipSave.current) {
      canvasHistory.current.push(json);
      setHistoryIndex(canvasHistory.current.length - 1);
    }


  }, [
    canvas
  ]);

  const undo = useCallback(() => {
    if (canUndo()) {
      skipSave.current = true;
      canvas?.clear();
      canvas?.renderAll();

      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(
        canvasHistory.current[previousIndex]
      );

      canvas?.loadFromJSON(previousState).then((_c) => {
        canvas.renderAll();
        setHistoryIndex(previousIndex);
        skipSave.current = false;
      });
    }
  }, [canvas, historyIndex, canUndo]);

  const redo = useCallback(() => {
    if (canRedo()) {
      skipSave.current = true;
      canvas?.clear();
      canvas?.renderAll();

      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(
        canvasHistory.current[nextIndex]
      );

      canvas?.loadFromJSON(nextState).then((_c) => {
        canvas.renderAll();
        setHistoryIndex(nextIndex);
        skipSave.current = false;
      });
    }
  }, [canvas, historyIndex, canRedo])

  return { save, undo, redo, canUndo, canRedo, setHistoryIndex, canvasHistory };
}