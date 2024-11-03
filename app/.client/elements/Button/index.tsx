import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Button(props) {
  const state = useStore(props.store, (state) => state);

  const { data } = state;

  return <button>{data?.content}</button>;
}

export default Button;
