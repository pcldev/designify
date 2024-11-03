import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Heading(props) {
  const state = useStore(props.store, (state) => state);

  const {
    data: { content },
  } = state;

  return <h3>{content}</h3>;
}

export default Heading;
