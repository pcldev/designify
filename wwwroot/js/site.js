const iframe = document.querySelector("iframe");

const rectangleBtn = document.querySelector("#rectangle-btn");
const triangleBtn = document.querySelector("#triangle-btn");
const circleBtn = document.querySelector("#circle-btn");
const heartBtn = document.querySelector("#heart-btn");
const textBtn = document.querySelector("#text-btn");

// INSPECTOR
const inspector = document.querySelector(".inspector");
const inputWidth = document.querySelector("#width-input");
const inputHeight = document.querySelector("#height-input");
const inputBackgroundColor = document.querySelector("#bg-color-input");
const inputColor = document.querySelector("#color-input");
const inputfsColor = document.querySelector("#fs-input");

window.inspector = inspector;
window.inputWidth = inputWidth;
window.inputHeight = inputHeight;
window.inputBackgroundColor = inputBackgroundColor;
window.inputColor = inputColor;
window.inputfsColor = inputfsColor;

// Add to window variable in order to avoid handling elements out of the iframe and easily control elements
window.rectangleBtn = rectangleBtn;
window.triangleBtn = triangleBtn;
window.circleBtn = circleBtn;
window.textBtn = textBtn;
window.heartBtn = heartBtn;

function renderIframe() {
  iframe.srcdoc = srcDoc();
}

function srcDoc() {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../css/editor.css" />
        <title>Designify - Editor</title>
      </head>
      <body>
        <div id="ds-editor"></div>
        <div id="ds-selection" class="absolute"></div>
        <script type="module" src="../js/modules/editor.js"></script>
      </body>
    </html>
    `;
}

renderIframe();
