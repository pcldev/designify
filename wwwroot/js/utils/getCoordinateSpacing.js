import { getRootSelector, getStyleByClassName } from "./getStyleByClassName.js";

export function getCoordinateSpacing(e, elementSelected) {
  const clientX = e.clientX;
  const clientY = e.clientY;

  const rootSelector = getRootSelector(elementSelected);
  const style = getStyleByClassName(rootSelector);

  const spaceX = clientX - +style.left.split("px")[0];
  const spaceY = clientY - +style.top.split("px")[0];

  return {
    spaceX,
    spaceY,
  };
}
