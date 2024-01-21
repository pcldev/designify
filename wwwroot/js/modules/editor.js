import { Elements } from "./index.js";
import { Inspector } from "./inspector/index.js";
import { Selection } from "./selection/index.js";

import "./controllers/index.js";
import { getCoordinateSpacing } from "../utils/getCoordinateSpacing.js";
import {
  getRootSelector,
  getStyleByClassName,
} from "../utils/getStyleByClassName.js";

let isDragging = false;
const { _update: updateSelection } = Selection();
window.addEventListener("mousedown", (e) => {
  const target = e.target;

  const { dsType, dsId } = target.dataset;

  if (!dsType || !dsId) {
    window.elementSelected = null;

    updateSelection();

    return;
  }

  window.elementSelected = target;
  isDragging = true;

  const { _update } = Inspector();

  _update();

  updateSelection();
});

window.addEventListener("mousemove", (e) => {
  if (!window.elementSelected || !isDragging) return;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const elementSelected = window.elementSelected;

  const rootSelector = getRootSelector(elementSelected);
  const style = getStyleByClassName(rootSelector);

  if (!elementSelected.spaceX || !elementSelected.spaceY) {
    const { spaceX, spaceY } = getCoordinateSpacing(e, elementSelected);
    elementSelected.spaceX = spaceX;
    elementSelected.spaceY = spaceY;
  }

  style.top = `${mouseY - elementSelected.spaceY}px`;
  style.left = `${mouseX - elementSelected.spaceX}px`;
  updateSelection();
});

window.addEventListener("mouseup", () => {
  isDragging = false;

  const elementSelected = window.elementSelected;

  if (!elementSelected) return;
  elementSelected.spaceX = null;
  elementSelected.spaceY = null;
});

window.addEventListener("keydown", (e) => {
  if (!window.elementSelected) return;

  if (e.key == "Backspace") {
    if (window.elementSelected.dataset.dsType === "Text") return;

    const { deleteElement } = Elements();
    deleteElement(window.elementSelected);
  }
});
