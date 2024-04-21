import { defaultClass } from "../../utils/defaultClass.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";
import { uuid } from "../../utils/uuid.js";

const type = "Text";
const position = { x: 200, y: 200 };

export function Text() {
  function _create(_rootSelector = null) {
    const _id = uuid();
    const rootSelector =
      _rootSelector || `ds_${hexToBase64(_id.split("-")[0])}`;

    const styleSheet = document.styleSheets[0];
    const cssRule = `.${rootSelector} { color: #000, background-color: transparent; font-size: 18px; top: ${position.x}px; left: ${position.y}px }`;

    styleSheet.insertRule(cssRule, 0);
    const DEFAULT_CLASS = defaultClass();

    const element = document.createElement("span");

    element.dataset.dsId = _id;
    element.dataset.dsType = type;
    element.classList = `${DEFAULT_CLASS} text ${rootSelector}`;
    element.contentEditable = true;
    element.innerHTML = "This is your heading text";

    return {
      _id,
      element,
    };
  }

  function _update() {}

  function _delete() {}

  return {
    _create,
    _update,
    _delete,
  };
}
