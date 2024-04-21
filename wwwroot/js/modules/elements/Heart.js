import { defaultClass } from "../../utils/defaultClass.js";
import { uuid } from "../../utils/uuid.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";

const type = "Heart";
const position = { x: 400, y: 400 };

export function Heart() {
  function _create(_rootSelector = null) {
    const _id = uuid();
    const rootSelector =
      _rootSelector || `ds_${hexToBase64(_id.split("-")[0])}`;

    const styleSheet = document.styleSheets[0];
    const cssRule = `.${rootSelector} {  top: ${position.x}px; left: ${position.y}px }`;
    styleSheet.insertRule(cssRule, 0);

    const DEFAULT_CLASS = defaultClass();

    const element = document.createElement("div");

    element.dataset.dsId = _id;
    element.dataset.dsType = type;
    element.classList = `${DEFAULT_CLASS} heart ${rootSelector}`;

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
