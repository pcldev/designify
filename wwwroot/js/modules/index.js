// elements: [{id:"abc-123", type: "rectangle", css}]

import { Outline } from "./outline/index.js";
import { hexToBase64 } from "../utils/hexToBase64.js";

let elements = [];
export function Elements() {
  const dsEditor = document.getElementById("ds-editor");
  const { _update: updateOutline } = Outline();

  function addElement(ele) {
    const { element } = ele;
    elements.push(element);
    dsEditor.appendChild(element);

    updateOutline();
  }

  function deleteElement(element) {
    const id = element.dataset.dsId;
    elements = elements.filter((element) => element._id !== id);

    dsEditor.removeChild(element);

    updateOutline();
  }

  function deleteElementById(id) {
    const element = document.querySelector(`[data-ds-id=${id}]`);
    elements.dsEditor.removeChild(element);

    updateOutline();
  }

  function getElementStyleBySelector(selector) {
    const cssText = Object.values(document.styleSheets[0].rules).find(
      (rule) => rule.selectorText === `.${selector}`
    ).cssText;

    return cssText;
  }

  function getElements() {
    return elements.map((element) => {
      const _id = element.getAttribute("data-ds-id");
      const type = element.getAttribute("data-ds-type");
      const rootSelector = `ds_${hexToBase64(_id.split("-")[0])}`;

      const stylesheet = document.styleSheets[0];
      stylesheet.cssRules;

      return {
        id_shape: rootSelector,
        type: type,
        styles: getElementStyleBySelector(rootSelector),
      };
    });
  }

  return {
    addElement,
    deleteElement,
    deleteElementById,
    getElements,
    elements,
  };
}
