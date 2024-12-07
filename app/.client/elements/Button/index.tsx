import React from "react";
import { useStore } from "~/.client/libs/external-store";
import TypographyStyling from "~/.client/modules/editor/components/Inspector/Styling/Typography";
import BackgroundColorInspector from "~/.client/modules/editor/components/Inspector/Styling/Background/BackgroundColor";
import BorderRadiusInspector from "~/.client/modules/editor/components/Inspector/Styling/Border/BorderRadius";
import ButtonContentInspector from "./inspector/ButtonContent";
import ButtonActionInspector from "./inspector/ButtonAction";

function Button(props) {
  const { mode } = props;
  const state = useStore(props.store, (state) => state);

  const { data } = state;

  const url = data?.url;

  return (
    <a
      {...(mode === "edit"
        ? {}
        : {
            href: url ?? "/",
          })}
    >
      {data?.content}
    </a>
  );
}

export default Button;

export const ButtonGeneral = [ButtonContentInspector, ButtonActionInspector];

export const ButtonStyling = [
  TypographyStyling,
  BackgroundColorInspector,
  BorderRadiusInspector,
];
