import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Column(props) {
  return <div>{props.children}</div>;
}

export default Column;
