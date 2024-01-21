import {
  getStyleByClassName,
  getRootSelector,
} from "../../utils/getStyleByClassName.js";

export function Selection() {
  const dsSelection = document.querySelector("#ds-selection");

  function _update() {
    if (
      !window.elementSelected ||
      window.elementSelected.dataset.dsType === "Text"
    ) {
      // Reset style
      dsSelection.style.padding = "0px";
      dsSelection.style.border = "";

      dsSelection.style.top = ``;
      dsSelection.style.left = ``;

      dsSelection.style.width = ``;
      dsSelection.style.height = ``;
      return;
    }
    const elementSelected = window.elementSelected;

    const rootSelector = getRootSelector(elementSelected);
    const style = getStyleByClassName(rootSelector);

    dsSelection.style.border = "3px solid pink";

    dsSelection.style.top = `calc(${style.top} - 5px)`;
    dsSelection.style.left = `calc(${style.left} - 5px)`;

    // Plus 10px in order to the selection is bigger than the element
    dsSelection.style.width = `calc(${style.width} + 10px)`;
    dsSelection.style.height = `calc(${style.height} + 10px)`;
  }

  return {
    _update,
  };
}
