import { rgbToHsb } from "@shopify/polaris";
import type tinycolor from "tinycolor2";
import { convertTinycolorToPolarisColor } from "../../components/ColorPicker";

/**
 * @author ThanhLM
 * @description This hook is used to get colors in multiple formats (hex, rgb, hsl, hsv, name, etc.)
 * @param color
 */
export const useColors = (color: tinycolor.Instance) => {
  const hexColor = color.toHex8String();
  const rgbColor = color.toRgb();
  const hsbColor = rgbToHsb(convertTinycolorToPolarisColor(rgbColor));

  return {
    hexColor,
    rgbColor,
    hsbColor,
  };
};
