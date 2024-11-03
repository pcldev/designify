import React, { useRef } from "react";
import useDragDrop from "./components/dnd-editor";

function DragAndDropEditor(props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorDndRef = useRef<HTMLDivElement>(null);

  const {
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleMouseDown,
    handleMouseOver,
    handleMouseUp,
    handleDragLeave,
    handleDragOverCapture,
  } = useDragDrop(editorDndRef);

  return (
    <div className={"pf-editor-body"}>
      <div
        onDragStartCapture={handleDragStart}
        onDragEnterCapture={handleDragEnter}
        onDragLeaveCapture={handleDragLeave}
        onDragOverCapture={handleDragOverCapture}
        onDropCapture={handleDrop}
        onMouseDownCapture={handleMouseDown}
        onMouseOverCapture={handleMouseOver}
        onMouseUpCapture={handleMouseUp}
        ref={editorDndRef}
        id="editor-dnd-wrapper"
        style={{ width: "100%" }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default DragAndDropEditor;
