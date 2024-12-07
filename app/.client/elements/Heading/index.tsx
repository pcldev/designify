import React from "react";
import { useStore } from "~/.client/libs/external-store";
import HeadingContentInspector from "./inspector/HeadingContent";
import TypographyStyling from "~/.client/modules/editor/components/Inspector/Styling/Typography";
import BackgroundColorInspector from "~/.client/modules/editor/components/Inspector/Styling/Background/BackgroundColor";
import SpacingInspector from "~/.client/modules/editor/components/Inspector/Styling/Spacing";

function Heading(props) {
  const state = useStore(props.store, (state) => state);

  const {
    data: { content, tag },
  } = state;

  const Component = tag;

  return <Component>{content}</Component>;
}

export default Heading;

export const HeadingGeneral = [HeadingContentInspector];

export const HeadingStyling = [
  TypographyStyling,
  BackgroundColorInspector,
  SpacingInspector,
];
