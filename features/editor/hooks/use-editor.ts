import { useCallback, useMemo, useState } from "react";
import { Canvas, Circle, Object, Polygon, Rect, Shadow, Triangle } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, FILL_COLOR, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_WIDTH, TRIANGLE_OPTIONS } from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEditor = ({ 
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  setFillColor,
  setStrokeColor,
  setStrokeWidth
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    // @ts-expect-error
    return canvas.getObjects().find((object) => object.name === 'clip');
  }

  const center = (object: Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    canvas._centerObject(object, center);
  }

  const addToCanvas = (object: Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  }

  return {
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      })
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }

        object.set({ stroke: value });
      })
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      })
    },
    addCircle: () => {
      const object = new Circle({
        ...CIRCLE_OPTIONS
      });

      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new Triangle({
        ...TRIANGLE_OPTIONS
      });

      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const HEIGHT = 400;
      const WIDTH = 400;

      const object = new Polygon([
        { x: 0, y: 0 },
        { x: WIDTH, y: 0 },
        { x: WIDTH / 2, y: HEIGHT }
      ]);

      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = 400;
      const WIDTH = 400;

      const object = new Polygon([
        { x: WIDTH / 2, y: 0 },
        { x: WIDTH, y: HEIGHT / 2 },
        { x: WIDTH / 2, y: HEIGHT },
        { x: 0, y: HEIGHT / 2 }
      ], {
        ...DIAMOND_OPTIONS
      });

      addToCanvas(object);
    },
    canvas,
    fillColor,
    strokeColor,
    strokeWidth
  };
}

export const useEditor = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [, setSelectedObjects] = useState<Object[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  useAutoResize({
    canvas,
    container
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ 
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
  ]);

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
  }, []);

  return { init, editor };
}