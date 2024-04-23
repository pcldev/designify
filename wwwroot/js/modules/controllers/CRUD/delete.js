import { Elements } from "../../index.js";

const deleteCanvasBtn = window.parent.deleteCanvasBtn;

deleteCanvasBtn.addEventListener("click", async () => {
  const DEFAULT_PATHNAME = "/layout/";

  const idCanva = window.parent.location.pathname.split(DEFAULT_PATHNAME)[1];

  const canvaFrame = document.querySelector("iframe");

  // Access the window object of the child frame
  //   const childWindow = canvaFrame.contentWindow;

  // Access a variable in the child window
  const { removeAllElements } = Elements();

  const parent = window.parent.document;
  const titleCanva = parent.getElementById("canva_title-input").value;
  const verifykey = parent.getElementById("canva_verifykey-input").value;

  const id_user = localStorage.getItem("id_user");

  // Clean up elements

  removeAllElements();

  const body = {
    id_canvas: idCanva,
    verify_key: verifykey,
    title: titleCanva,
    id_user: id_user,
    elements: JSON.stringify([]),
  };

  const response = await fetch("/layout/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log("result: ", result);

  if (result.success) {
    alert("Clear all elements successfully");
  }
});
