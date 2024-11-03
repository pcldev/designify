import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Layout(props) {
  return <div>{props.children}</div>;
}

export default Layout;
