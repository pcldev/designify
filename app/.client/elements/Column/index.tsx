import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Column(props) {
  const children = props.children;

  const columnSize = props.store.getState().data.size;

  if (!children.length)
    return (
      <div
        style={{
          minHeight: "50px",
          minWidth: "50px",
          maxWidth: `calc(100% / 12 * ${columnSize})`,
          flexBasis: `calc(100% / 12 * ${columnSize})`,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Column placeholder
      </div>
    );

  return (
    <div
      style={{
        maxWidth: `calc(100% / 12 * ${columnSize})`,
        flexBasis: `calc(100% / 12 * ${columnSize})`,
        ...(props.style || {}),
      }}
    >
      {children}
    </div>
  );
}

export default Column;
