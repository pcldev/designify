import EmptyElements from "./EmptyElements";

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
            <EmptyElements />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
