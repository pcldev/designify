import { Circle } from "../elements/Circle.js";
import { Elements } from "../index.js";

const circleBtn = window.parent.circleBtn;

circleBtn.addEventListener("click", (e) => {
  const { addElement } = Elements();
  const { _create: _createText } = Circle();

  const html = _createText();
  addElement(html);
});
