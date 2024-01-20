import { hexToBase64 } from "./hexToBase64.js";

export function getStyleByClassName(className) {
  let style = {};
  const classes = document.styleSheets[0].cssRules;
  for (let x = 0; x < classes.length; x++) {
    if (classes[x].selectorText == className) {
      style = classes[x].style;
    }
  }
  return style;
}

export function getRootSelector(element) {
  const _id = element.dataset.dsId;
  const rootSelector = hexToBase64(_id.split("-")[0]);

  return `.ds_${rootSelector}`;
}
