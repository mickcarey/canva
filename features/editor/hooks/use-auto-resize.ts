import { Canvas, iMatrix, Point, Rect, util } from "fabric"
import { loadComponents } from "next/dist/server/load-components";
import { useCallback, useEffect } from "react"

interface Props {
  canvas: Canvas | null,
  container: HTMLDivElement | null
}

export const useAutoResize = ({ canvas, container }: Props) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setWidth(width);
    canvas.setHeight(height);

    const center = canvas.getCenter();

    const zoomRatio = 0.85;

    // @ts-expect-error
    const localWorkspace = canvas.getObjects().find((object) => object.name === 'clip');

    // @ts-expect-error
    const scale = util.findScaleToFit(localWorkspace, {
      width: width,
      height: height
    });

    const zoom = zoomRatio * scale;

    // @ts-expect-error
    canvas.setViewportTransform(iMatrix.concat());
    canvas.zoomToPoint(new Point(center.left, center.top), zoom);

    if (!localWorkspace) return;

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined || 
      !viewportTransform
    ) {
      return;
    }

    viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
    viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    // @ts-expect-error
    localWorkspace.clone().then((cloned: Rect) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    }

  }, [canvas, container])
}