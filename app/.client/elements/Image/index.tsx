import React from "react";
import { useStore } from "~/.client/libs/external-store";

const placeholder =
  "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";

function Image(props) {
  const state = useStore(props.store, (state) => state);

  const { data } = state;
  return <img style={{ width: "100%" }} src={data?.src || placeholder} />;
}

export default Image;
