import { Rectangle } from "../elements/Rectangle.js";
import { Elements } from "../index.js";

const rectangleBtn = window.parent.rectangleBtn;

// At this time, we don't write a class for extending the creation element because in the future, we will migrate it to another approach like dragging element instead

rectangleBtn.addEventListener("click", (e) => {
  const { addElement } = Elements();
  const { _create } = Rectangle();
  const html = _create();

  addElement(html);
});
