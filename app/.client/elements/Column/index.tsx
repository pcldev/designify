import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Column(props) {
  const children = props.children;

  if (!children.length)
    return (
      <div style={{ minHeight: "50px", minWidth: "50px" }}>
        Column placeholder
      </div>
    );

  return <div>{children}</div>;
}

export default Column;
