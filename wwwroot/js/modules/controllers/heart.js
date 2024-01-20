import { Heart } from "../elements/Heart.js";
import { Elements } from "../index.js";

const heartBtn = window.parent.heartBtn;

heartBtn.addEventListener("click", (e) => {
  const { addElement } = Elements();
  const { _create } = Heart();

  const html = _create();
  addElement(html);
});
