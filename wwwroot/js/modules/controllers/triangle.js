import { Triangle } from "../elements/Triangle.js";
import { Elements } from "../index.js";

const triangleBtn = window.parent.triangleBtn;

triangleBtn.addEventListener("click", (e) => {
  const { addElement } = Elements();
  const { _create } = Triangle();

  const html = _create();
  addElement(html);
});
