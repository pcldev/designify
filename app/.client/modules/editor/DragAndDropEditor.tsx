import React, { useRef } from "react";
import useDragDrop from "./components/dnd-editor";

function DragAndDropEditor(props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorDndRef = useRef<HTMLDivElement>(null);
  const highlightBoxRef = useRef<HTMLDivElement>(null);

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
  } = useDragDrop(containerRef, highlightBoxRef);

  return (
    <div className={"ds-editor-body"} ref={containerRef}>
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
      <HighLightBox highlightBoxRef={highlightBoxRef} />
    </div>
  );
}

export default DragAndDropEditor;

function HighLightBox(props: {
  highlightBoxRef: React.RefObject<HTMLDivElement>;
}) {
  return <div className="ds-high_light-box" ref={props.highlightBoxRef}></div>;
}
