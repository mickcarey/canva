import { filters } from "fabric";
import { RGBColor } from "react-color";

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
    default:
      effect = new filters.BaseFilter();
  }

  return effect;
}