// elements: [{id:"abc-123", type: "rectangle", css}]

let elements = [];
export function Elements() {
  const dsEditor = document.getElementById("ds-editor");

  function addElement(ele) {
    const { element } = ele;
    elements.push(element);
    dsEditor.appendChild(element);
  }

  function deleteElement(element) {
    const id = element.dataset.dsId;
    elements = elements.filter((element) => element._id !== id);

    dsEditor.removeChild(element);
  }

  function deleteElementById(id) {
    const element = document.querySelector(`[data-ds-id=${id}]`);
    elements.dsEditor.removeChild(element);
  }

  return {
    addElement,
    deleteElement,
    deleteElementById,
    elements,
  };
}
