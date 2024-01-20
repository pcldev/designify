import { defaultClass } from "../../utils/defaultClass.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";
import { uuid } from "../../utils/uuid.js";

const type = "Triangle";

export function Triangle() {
  function _create() {
    const _id = uuid();

    const rootSelector = `ds_${hexToBase64(_id.split("-")[0])}`;
    const DEFAULT_CLASS = defaultClass();

    const position = { x: 300, y: 300 };
    const element = document.createElement("div");

    element.dataset.dsId = _id;
    element.dataset.dsType = type;
    element.classList = `${DEFAULT_CLASS} triangle ${rootSelector}`;
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
