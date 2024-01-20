import { defaultClass } from "../../utils/defaultClass.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";
import { uuid } from "../../utils/uuid.js";

const type = "Circle";

export function Circle() {
  function _create() {
    const _id = uuid();

    const rootSelector = `ds_${hexToBase64(_id.split("-")[0])}`;
    var styleSheet = document.styleSheets[0];
    var cssRule = `.${rootSelector} { width: 300px; height: 100px; background-color: #ccc; }`;

    styleSheet.insertRule(cssRule, 0);
    const DEFAULT_CLASS = defaultClass();

    const position = { x: 250, y: 250 };
    const element = document.createElement("div");
    element.dataset.dsId = _id;
    element.dataset.dsType = type;
    element.classList = `${DEFAULT_CLASS} circle ${rootSelector}`;
    element.style = `top: ${position.x}px; left: ${position.y}px`;

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
