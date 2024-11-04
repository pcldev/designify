import { useEffect, useState } from "react";

import React from "react";
import { useStore } from "~/.client/libs/external-store";

function renderPlaceholder(store) {
  const { type } = store;
  return (
    <div style={{ minHeight: "50px", minWidth: "50px" }}>Row placeholder</div>
  );
}

function Row(props: any) {
  const {
    children,
    store,
    gutter,
    stretch,
    equals,
    cols,
    store: { mode },
  } = props;

  let { align } = props;

  align = align !== "lt" ? ` ds-c-${align}` : "";
  const stretchClass = stretch ? " ds-r-eh" : "";
  const className = `ds-r${align}${stretchClass}`;
  const style = {
    // ...styleVariableByDevices(getItemSpacing(gutter), "s"),
  };

  const state = useStore(props.store, (state) => state);

  const rowComponent = (
    <div className={className} style={style}>
      {children}
    </div>
  );

  //   if (mode === "view") {
  //     return rowComponent;
  //   }

  return children.length ? rowComponent : renderPlaceholder(store);
}

export default Row;
