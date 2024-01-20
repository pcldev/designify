import { Elements } from "./index.js";
import { Inspector } from "./inspector/index.js";

import "./controllers/index.js";

let isDragging = false;

window.addEventListener("mousedown", (e) => {
  const target = e.target;

  const { dsType, dsId } = target.dataset;

  if (!dsType || !dsId) return;

  window.elementSelected = target;
  isDragging = true;

  const { _update } = Inspector();

  _update();
});

window.addEventListener("mousemove", (e) => {
  if (!window.elementSelected || !isDragging) return;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const elementSelected = window.elementSelected;

  elementSelected.style.top = `${mouseY}px`;
  elementSelected.style.left = `${mouseX}px`;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("keydown", (e) => {
  if (!window.elementSelected) return;

  if (e.key == "Backspace") {
    if (window.elementSelected.dataset.dsType === "Text") return;

    const { deleteElement } = Elements();
    deleteElement(window.elementSelected);
  }
});
