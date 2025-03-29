import { useCallback, useState } from "react";
import { Canvas, Rect, Shadow } from "fabric";
import { useAutoResize } from "./use-auto-resize";

export const useEditor = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    container
  });

  const init = useCallback(({
    initialCanvas,
    initialContainer
  }: {
    initialCanvas: Canvas;
    initialContainer: HTMLDivElement
  }) => {
    const initialWorkspace = new Rect({
      width: 900,
      height: 1200,
      name: 'clip',
      fill: 'white',
      selectable: false,
      hasControls: false,
      shadow: new Shadow({
        color: "rgba(0,0,0,0.8)",
        blur: 5
      })
    });

    initialCanvas.setWidth(initialContainer.offsetWidth);
    initialCanvas.setHeight(initialContainer.offsetHeight);

    initialCanvas.add(initialWorkspace);
    initialCanvas.centerObject(initialWorkspace);
    initialCanvas.clipPath = initialWorkspace;

    setCanvas(initialCanvas);
    setContainer(initialContainer);

    const test = new Rect({
      height: 100,
      width: 100,
      fill: 'black'
    });

    initialCanvas.add(test);
    initialCanvas.centerObject(test);
  }, []);

  return { init };
}