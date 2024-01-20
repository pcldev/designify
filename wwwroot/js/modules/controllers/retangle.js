import { Rectangle } from "../elements/Rectangle.js";
import { Elements } from "../index.js";

const rectangleBtn = window.parent.rectangleBtn;

rectangleBtn.addEventListener("click", (e) => {
  const { addElement } = Elements();
  const { _create } = Rectangle();
  const html = _create();

  addElement(html);
});
