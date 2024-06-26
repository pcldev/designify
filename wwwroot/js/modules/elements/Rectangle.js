import { defaultClass } from "../../utils/defaultClass.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";
import { uuid } from "../../utils/uuid.js";

const type = "Rectangle";

// #TODO: Each elements are duplicated initial config

const position = { x: 100, y: 100 };

export function Rectangle() {
  function _create(id = null, _cssRule = null) {
    const _id = id || uuid();
    const rootSelector = `ds_${hexToBase64(_id.split("-")[0])}`;

    const styleSheet = document.styleSheets[0];
    const cssRule =
      _cssRule ||
      `.${rootSelector} { width: 300px; height: 100px; top: ${position.x}px; left: ${position.y}px; background-color: #ccc; }`;

    styleSheet.insertRule(cssRule, 0);
    const DEFAULT_CLASS = defaultClass();

    const element = document.createElement("div");

    element.dataset.dsId = _id;
    element.dataset.dsType = type;
    element.classList = `${DEFAULT_CLASS} rectangle ${rootSelector}`;
    // element.style = `top: ${position.x}px; left: ${position.y}px`;

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
