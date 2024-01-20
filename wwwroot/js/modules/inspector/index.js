import {
  getRootSelector,
  getStyleByClassName,
} from "../../utils/getStyleByClassName.js";
import { rgbToHex } from "../../utils/rgbToHex.js";
import { Selection } from "../selection/index.js";

export function Inspector() {
  const inputWidth = window.parent.inputWidth;
  const inputHeight = window.parent.inputHeight;
  const inputBackgroundColor = window.parent.inputBackgroundColor;
  const inputColor = window.parent.inputColor;
  const inputfsColor = window.parent.inputfsColor;

  const { _update: updateSelection } = Selection();

  inputWidth.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["width"] = `${value}px`;

    updateSelection();
  });

  inputHeight.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["height"] = `${value}px`;

    updateSelection();
  });

  inputBackgroundColor.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["backgroundColor"] = `${value}`;

    updateSelection();
  });

  inputColor.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;
    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["color"] = `${value}`;

    updateSelection();
  });

  inputfsColor.addEventListener("input", (e) => {
    const elementSelected = window.elementSelected;
    if (!elementSelected) return;

    const value = e.target.value;

    const rootSelector = getRootSelector(elementSelected);

    const style = getStyleByClassName(rootSelector);
    style["font-size"] = `${value}px`;

    updateSelection();
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
