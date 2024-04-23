import { getCanvaData } from "../../index.js";

const readCanvasBtn = window.parent.readCanvasBtn;

readCanvasBtn.addEventListener("click", () => {
  getCanvaData();
});
