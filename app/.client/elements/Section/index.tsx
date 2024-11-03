import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Section(props) {
  return <div>{props.children}</div>;
}

export default Section;
