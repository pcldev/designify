import { defaultClass } from "../../utils/defaultClass.js";
import { hexToBase64 } from "../../utils/hexToBase64.js";
import { uuid } from "../../utils/uuid.js";

const type = "Text";

export function Text() {
  function _create() {
    const _id = uuid();

    const rootSelector = `ds_${hexToBase64(_id.split("-")[0])}`;
    var styleSheet = document.styleSheets[0];
    var cssRule = `.${rootSelector} { color: #000, background-color: transparent; font-size: 18px }`;

    styleSheet.insertRule(cssRule, 0);
    const DEFAULT_CLASS = defaultClass();

    const position = { x: 200, y: 200 };
    const html = `<span data-ds-id='${_id}' data-ds-type='${type}' class='${DEFAULT_CLASS} text ${rootSelector}' contenteditable="true" style="top: ${position.x}px; left: ${position.y}px">This your heading text</span>`;

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
