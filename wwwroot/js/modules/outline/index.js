import { Elements } from "../index.js";

export function Outline() {
  const outline = window.parent.outline;

  function _update() {
    const { elements } = Elements();

    let html = "";
    elements.forEach((element) => {
      const htmlElement = `<div class="card bg-light mb-2 ${
        window.elementSelected?.dataset?.dsId === element.dataset.dsId
          ? "b-dash"
          : ""
      }">
          <div class="flex flex-ai-center p-10 g-4">
              <img src="/grip-vertical-solid.svg" alt="" width="8px">
              <span>${element.dataset.dsType}</span>
          </div>
      </div>`;

      html += htmlElement;
    });

    outline.innerHTML = html;
  }

  return {
    _update,
  };
}
