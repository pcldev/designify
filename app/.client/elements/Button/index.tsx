import React from "react";
import { useStore } from "~/.client/libs/external-store";
import TypographyStyling from "~/.client/modules/editor/components/Inspector/Styling/Typography";
import ButtonContentInspector from "./inspector/ButtonContent";
import ButtonActionInspector from "./inspector/ButtonAction";

function Button(props) {
  const state = useStore(props.store, (state) => state);

  const { data } = state;

  return <button>{data?.content}</button>;
}

export default Button;

export const ButtonGeneral = [ButtonContentInspector, ButtonActionInspector];

export const ButtonStyling = [TypographyStyling];
