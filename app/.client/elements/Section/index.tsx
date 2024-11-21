import React from "react";
import { useStore } from "~/.client/libs/external-store";

function Section(props) {
  return (
    <div>
      <div
        style={{
          maxWidth: "1170px",
          margin: "auto",
          padding: "0 15px",
          width: "100%",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Section;
