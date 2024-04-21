// elements: [{id:"abc-123", type: "rectangle", css}]

import { Outline } from "./outline/index.js";
import { hexToBase64 } from "../utils/hexToBase64.js";
import { Rectangle } from "../modules/elements/Rectangle.js";
import { Circle } from "../modules/elements/Circle.js";
import { Triangle } from "../modules/elements/Triangle.js";
import { Text } from "./elements/Text.js";
import { Heart } from "./elements/Heart.js";

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
        id_shape: _id,
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

async function getCanvaData() {
  const DEFAULT_PATHNAME = "/canva/";

  const idCanva = window.parent.location.pathname.split(DEFAULT_PATHNAME)[1];

  console.log("idCanva: ", idCanva);
  const response = await fetch("/canva/getCanva", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: idCanva,
    }),
  });

  const result = await response.json();

  if (!result.success || !result.canva) return;

  const { elements, title } = result.canva;
  window.parent.document.getElementById("canva_title-input").value = title;

  const _elements = JSON.parse(elements);

  const { addElement } = Elements();

  _elements.forEach((element) => {
    const type = element.type;

    const ELEMENT = {
      Rectangle: Rectangle,
      Circle: Circle,
      Heart: Heart,
      Triangle: Triangle,
      Text: Text,
    };

    const { _create } = ELEMENT[type]();

    const html = _create(element.id_shape, element.styles);

    addElement(html);
  });
}

getCanvaData();
