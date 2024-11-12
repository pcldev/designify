import React from "react";
import { useStore } from "~/.client/libs/external-store";
import TypographyStyling from "../Styling/Typography";

export interface IStylingInspectorProps {
  elementStore: any;
}

function StylingInspector(props: IStylingInspectorProps) {
  const { elementStore } = props;

  const state = useStore(elementStore, (state) => state);

  return (
    <div>
      <TypographyStyling elementStore={elementStore} />
    </div>
  );
}

export default StylingInspector;
