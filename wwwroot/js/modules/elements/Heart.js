import { defaultClass } from "../../utils/defaultClass.js";
import { uuid } from "../../utils/uuid.js";

const type = "Heart";

export function Heart() {
  function _create() {
    const _id = uuid();

    const DEFAULT_CLASS = defaultClass();

    const position = { x: 400, y: 400 };
    const html = `<div data-ds-id='${_id}' data-ds-type='${type}' class='${DEFAULT_CLASS} heart' style="top: ${position.x}px; left: ${position.y}px"></div>`;

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
