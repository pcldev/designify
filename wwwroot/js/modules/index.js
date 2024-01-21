// elements: [{id:"abc-123", type: "rectangle", css}]

import { Outline } from "./outline/index.js";

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

  return {
    addElement,
    deleteElement,
    deleteElementById,
    elements,
  };
}
