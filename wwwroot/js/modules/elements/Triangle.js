import { defaultClass } from "../../utils/defaultClass.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";
import { uuid } from "../../utils/uuid.js";

const type = "Triangle";
const position = { x: 300, y: 300 };

export function Triangle() {
  function _create() {
    const _id = uuid();

    const rootSelector = `ds_${hexToBase64(_id.split("-")[0])}`;
    const DEFAULT_CLASS = defaultClass();

    const styleSheet = document.styleSheets[0];
    const cssRule = `.${rootSelector} { width: 300px; height: 200px; top: ${position.x}px; left: ${position.y}px; background: rgb(255, 179, 252)}`;

    styleSheet.insertRule(cssRule, 0);
    const element = document.createElement("div");

    element.dataset.dsId = _id;
    element.dataset.dsType = type;
    element.classList = `${DEFAULT_CLASS} triangle ${rootSelector}`;

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
