import { defaultClass } from "../../utils/defaultClass.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";
import { uuid } from "../../utils/uuid.js";

const type = "Rectangle";

export function Rectangle() {
  function _create() {
    const _id = uuid();

    const rootSelector = `ds_${hexToBase64(_id.split("-")[0])}`;
    var styleSheet = document.styleSheets[0];
    var cssRule = `.${rootSelector} { width: 300px; height: 100px; background-color: #ccc; }`;

    styleSheet.insertRule(cssRule, 0);
    const DEFAULT_CLASS = defaultClass();

    const position = { x: 100, y: 100 };
    const html = `<div data-ds-id='${_id}' data-ds-type='${type}' class='${DEFAULT_CLASS} rectangle ${rootSelector}' style="top: ${position.x}px; left: ${position.y}px"></div>`;

    return {
      _id,
      html,
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
