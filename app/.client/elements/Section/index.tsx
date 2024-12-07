import React from "react";
import { useStore } from "~/.client/libs/external-store";

import BackgroundImageInspector from "../../modules/editor/components/Inspector/Styling/Background/";
import SpacingInspector from "~/.client/modules/editor/components/Inspector/Styling/Spacing";

function Section(props) {
  return (
    <section
      style={{
        maxWidth: "1170px",
        margin: "auto",
        padding: "0 15px",
        width: "100%",
      }}
    >
      {/* <div
        style={{
          maxWidth: "1170px",
          margin: "auto",
          padding: "0 15px",
          width: "100%",
        }}
      > */}
      {props.children}
      {/* </div> */}
    </section>
  );
}

export default Section;

export const SectionStyling = [BackgroundImageInspector, SpacingInspector];
