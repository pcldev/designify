import { memo, useEffect } from "react";
import EditorSandbox from "../../";

function Editor() {
  return (
    <div className="editor">
      <div
        style={{
          height: "100%",
          padding: "var(--p-space-200)",
          background: "var(--p-color-bg)",
        }}
      >
        <div
          style={{
            height: "100%",
            padding: "var(--p-space-200)",
            background: "var(--p-color-bg-fill)",
            borderRadius: "4px",
          }}
        >
          <div className="center-div">
            <EditorSandbox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Editor);
