import { Canvas } from "fabric"
import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: Canvas | null
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<any>(null);

  const copy = useCallback(async () => {
    const cloned = await canvas?.getActiveObject()?.clone();
    clipboard.current = cloned;
  }, [canvas]);

  const paste = useCallback(async () => {
    if (!clipboard.current) {
      alert('empty');
      return;
    }

    const clonedObj = await clipboard.current.clone();
    canvas?.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true
    });

    if (clonedObj.type === "activeselection") {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject((obj: any) => {
        canvas?.add(obj);
      });
      clonedObj.setCoords();
    } else {
      canvas?.add(clonedObj);
    }

    clipboard.current.top += 10;
    clipboard.current.left += 10;

    canvas?.setActiveObject(clonedObj);
    canvas?.requestRenderAll();
  }, [canvas]);

  return { copy, paste };
}