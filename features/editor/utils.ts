import { filters } from "fabric";
import { RGBColor } from "react-color";
import { uuid } from "uuidv4";

export function transformText(objects: any) {
  if (!objects) return;

  objects.forEach((item: any) => {
    if (item.objects) {
      transformText(item.objects);
    } else {
      item.type === "text" && (item.type === "textbox");
    }
  });
}

export function downloadFile(file: string, type: string) {
  const anchorElement = document.createElement('a');

  anchorElement.href = file;
  anchorElement.download = `${uuid()}.${type}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
}

export function isTextType(type: string | undefined) {
  return type === 'text' || type === 'i-text' || type === 'textbox';
}

export function rgbaObjectToString (rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return `rgba(0,0,0,0)`;
  }

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`
}

export const createFilter = (value: string) => {
  let effect;

  switch(value) {
    case "polaroid":
      effect = new filters.Polaroid();
      break;
    case "sepia":
      effect = new filters.Sepia();
      break;
    case "invert":
      effect = new filters.Invert();
      break;
    case "sharpen":
      effect = new filters.Convolute({ matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]});
      break;
    case "emboss":
      effect = new filters.Convolute({ matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1]});
      break;
    case "blur":
      effect = new filters.Blur({ blur: 0.4 });
      break;
    case "grayscale":
      effect = new filters.Grayscale();
      break;
    case "kodachrome":
      effect = new filters.Kodachrome();
      break;
    case "contrast":
      effect = new filters.Contrast({ contrast: 0.3 });
      break;
    case "brightness":
      effect = new filters.Brightness({ brightness: 0.8 });
      break;
    case "brownie":
      effect = new filters.Brownie();
      break;
    case "vintage":
      effect = new filters.Vintage();
      break;
    case "technicolor":
      effect = new filters.Technicolor();
      break;
    case "pixelate":
      effect = new filters.Pixelate();
      break;
    case "blackwhite":
      effect = new filters.BlackWhite();
      break;
    default:
      effect = new filters.BaseFilter();
  }

  return effect;
}