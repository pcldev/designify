import { Text } from "../elements/Text.js";
import { Elements } from "../index.js";

const textBtn = window.parent.textBtn;

textBtn.addEventListener("click", (e) => {
  const { addElement } = Elements();
  const { _create: _createText } = Text();

  const html = _createText();
  addElement(html);
});
