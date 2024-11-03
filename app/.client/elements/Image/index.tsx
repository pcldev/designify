import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Image(props) {
  const state = useStore(props.store, (state) => state);

  const { data } = state;
  return <img src={data?.src} />;
}

export default Image;
