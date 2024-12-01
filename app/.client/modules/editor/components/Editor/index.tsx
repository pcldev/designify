import { memo } from "react";
import EditorSandbox from "../../";
import HeaderFooter from "./HeaderFooter";

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
        <HeaderFooter />
        <div
          style={{
            height: "92%",
            padding: "var(--p-space-200)",
            background: "var(--p-color-bg-fill)",
            borderRadius: "4px",
          }}
        >
          <div className="center-div">
            <EditorSandbox />
          </div>
        </div>
        <HeaderFooter />
      </div>
    </div>
  );
}

export default memo(Editor);
