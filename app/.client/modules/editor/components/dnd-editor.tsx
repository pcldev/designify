import { useCallback, useState } from "react";

const globalDragData = {};

function useDragDrop(editorDndRef, highlightBoxRef) {
  const [draggedElement, setDraggedElement] = useState(null);

  const handleDragStart = useCallback((event) => {
    const target = event.target;

    const elementId = target.getAttribute("data-ds-id");

    if (elementId) {
      setDraggedElement(elementId);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setDragImage(target, 0, 0);

      globalDragData.target = target;
    }
  }, []);

  const getDropPosition = (event, targetElement) => {
    const { top, left, right, bottom } = targetElement.getBoundingClientRect();
    const offsetX = event.clientX - left;
    const offsetY = event.clientY - top;
    const width = right - left;
    const height = bottom - top;

    const edgeThreshold = 0.25; // Defines the boundary threshold as a percentage of the width/height
    const isTop = offsetY < height * edgeThreshold;
    const isBottom = offsetY > height * (1 - edgeThreshold);
    const isLeft = offsetX < width * edgeThreshold;
    const isRight = offsetX > width * (1 - edgeThreshold);

    if (isTop) return "top";
    if (isBottom) return "bottom";
    if (isLeft) return "left";
    if (isRight) return "right";
    return "inside"; // Default to dropping inside the target
  };

  const handleDragEnter = useCallback((event) => {
    event.preventDefault();
    console.log("Drag entered");
  }, []);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();

    const target = event.target as HTMLElement;

    console.log("target: --------", target);

    globalDragData.dropTarget = target;

    const box = target.getBoundingClientRect();

    const highLightBox = highlightBoxRef.current;

    highLightBox.style.width = box.width;
    highLightBox.style.height = box.height;
    highLightBox.style.top = box.top;
    highLightBox.style.left = box.left;
    // console.log("Drag over");

    // console.log("event: ", event.target);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const dropTargetId = event.target.getAttribute("data-ds-id");

      console.log("globalDragData: ", globalDragData);
      console.log('dropTargetId": ', dropTargetId);
      if (draggedElement && dropTargetId) {
        const dropPosition = getDropPosition(event, event.target);
        console.log(
          "Dropped:",
          draggedElement,
          "on:",
          dropTargetId,
          "at position:",
          dropPosition,
        );

        // Implement logic to rearrange the element structure based on dropPosition
      }
      setDraggedElement(null);
    },
    [draggedElement],
  );

  const handleDragLeave = useCallback((event) => {
    // console.log("Drag left");
  }, []);

  const handleMouseDown = useCallback(() => {
    // console.log("Mouse down");
  }, []);

  const handleMouseOver = useCallback(() => {
    // console.log("Mouse over");
  }, []);

  const handleMouseUp = useCallback(() => {
    // console.log("Mouse up");
  }, []);

  const handleDragOverCapture = useCallback((event) => {
    handleDragOver(event);

    // console.log("Drag over (capture phase)");
  }, []);

  return {
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleMouseDown,
    handleMouseOver,
    handleMouseUp,
    handleDragLeave,
    handleDragOverCapture,
  };
}

export default useDragDrop;
