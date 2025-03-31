import { useCallback, useMemo, useState } from "react";
import { Canvas, Circle, Polygon, Rect, Shadow, Textbox, Triangle, FabricImage, FabricObject } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, EditorHookProps, FILL_COLOR, FONT_FAMILY, FONT_SIZE, FONT_STYLE, FONT_WEIGHT, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH, TEXT_OPTIONS, TRIANGLE_OPTIONS } from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEditor = ({ 
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  selectedObjects,
  strokeDashArray,
  fontFamily,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  setStrokeDashArray,
  setFontFamily
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    // @ts-expect-error
    return canvas.getObjects().find((object) => object.name === 'clip');
  }

  const center = (object: FabricObject) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    canvas._centerObject(object, center);
  }

  const addToCanvas = (object: FabricObject) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  }

  return {
    addImage: async (value: string) => {
      const object = await FabricImage.fromURL(value);
      addToCanvas(object);
      canvas.renderAll();
    },
    delete: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.remove(object);
        canvas.discardActiveObject();
        canvas.renderAll();
      });
    },
    addText: (value: string, options) => {
      const object = new Textbox(value, {
        ...TEXT_OPTIONS,
        ...options
      });

      addToCanvas(object);
    },
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontSize: value });
        }
      });

      canvas.renderAll();
    },
    changeTextAlignment: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ textAlign: value });
        }
      });

      canvas.renderAll();
    },
    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ underline: value });
        }
      });

      canvas.renderAll();
    },
    changeFontLinethrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ linethrough: value });
        }
      });

      canvas.renderAll();
    },
    changeFontStyle: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontStyle: value });
        }
      });

      canvas.renderAll();
    },
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontWeight: value });
        }
      });

      canvas.renderAll();
    },
    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });

      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringObjectForward(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();

      if (workspace) {
        canvas.sendObjectToBack(workspace);
      }
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendObjectBackwards(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();

      if (workspace) {
        canvas.sendObjectToBack(workspace);
      }
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }

        object.set({ stroke: value });
      });
      canvas.renderAll();
    },
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontFamily: value });
        }
      });
      canvas.renderAll();
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      });

      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
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
      ], {
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      });

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
        ...DIAMOND_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      });

      addToCanvas(object);
    },
    canvas,
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      // @ts-expect-error
      const value = selectedObject.get("opacity") || 1;
      return value;
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fillColor;
      }

      // @ts-expect-error
      const value = selectedObject.get('fill') || fillColor;

      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeColor;
      }

      // @ts-expect-error
      const value = selectedObject.get('stroke') || strokeColor;

      return value as string;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeWidth;
      }

      // @ts-expect-error
      const value = selectedObject.get('strokeWidth') || strokeWidth;

      return value as number;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeDashArray;
      }

      // @ts-expect-error
      const value = selectedObject.get('strokeDashArray') || strokeDashArray;

      return value;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fontFamily;
      }

      // @ts-expect-error
      const value = selectedObject.get('fontFamily') || fontFamily;

      return value;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_SIZE
      }

      // @ts-expect-error
      const value = selectedObject.get('fontSize') || FONT_SIZE;

      return value;
    },
    getActiveTextAlignment: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return "left";
      }

      // @ts-expect-error
      const value = selectedObject.get('textAlign') || "left";

      return value;
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return false;
      }

      // @ts-expect-error
      const value = selectedObject.get('underline') || false;

      return value;
    },
    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return false;
      }

      // @ts-expect-error
      const value = selectedObject.get('linethrough') || false;

      return value;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_STYLE;
      }

      // @ts-expect-error
      const value = selectedObject.get('fontStyle') || FONT_STYLE;

      return value;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_WEIGHT;
      }

      // @ts-expect-error
      const value = selectedObject.get('fontWeight') || FONT_WEIGHT;

      return value;
    },
    selectedObjects
  };
}

export const useEditor = ({
  clearSelectionCallback
}: EditorHookProps) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);

  useAutoResize({
    canvas,
    container
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ 
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        fontFamily,
        selectedObjects,
        strokeDashArray,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        setStrokeDashArray,
        setFontFamily
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    fontFamily
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