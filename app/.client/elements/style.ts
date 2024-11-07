export function getElementStyleByClassName(className: string) {
  let style = {};
  const classes = document.styleSheets[0].cssRules;
  for (let x = 0; x < classes.length; x++) {
    if (classes[x].selectorText == className) {
      style = classes[x].style;
    }
  }
  return style;
}
