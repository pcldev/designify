import {
  getRootSelector,
  getStyleByClassName,
} from "../../utils/getStyleByClassName.js";
import { rgbToHex } from "../../utils/rgbToHex.js";

export function Inspector() {
  const inputWidth = window.parent.inputWidth;
  const inputHeight = window.parent.inputHeight;
  const inputBackgroundColor = window.parent.inputBackgroundColor;
  const inputColor = window.parent.inputColor;
  const inputfsColor = window.parent.inputfsColor;

  inputWidth.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["width"] = `${value}px`;
  });

  inputHeight.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["height"] = `${value}px`;
  });

  inputBackgroundColor.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["backgroundColor"] = `${value}`;
  });

  inputColor.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["color"] = `${value}`;
  });

  inputfsColor.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;

    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["font-size"] = `${value}px`;
  });

  function _update() {
    const elementSelected = window.elementSelected;
    inputWidth.value = elementSelected.offsetWidth;
    inputHeight.value = elementSelected.offsetHeight;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    inputBackgroundColor.value = rgbToHex(style["background-color"]);

    inputfsColor.value = +style["font-size"].replace("px", "");
    // inspector
  }

  return {
    _update,
  };
}
