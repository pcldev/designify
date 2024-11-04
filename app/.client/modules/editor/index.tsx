import React, { useEffect, useLayoutEffect } from "react";
import Sandbox from "./Sandbox";
import { RenderElement } from "./render-root";
import { initPageStore } from "./page-store";
import {
  getElementStoreById,
  getRootElementStore,
} from "~/.client/stores/element-store";

import DragAndDropEditor from "./DragAndDropEditor";
import { useStore } from "~/.client/libs/external-store";
import { pageStore } from "~/.client/stores/page-store";

function EditorSandbox() {
  useEffect(() => {
    // Init page store
    initPageStore();
  }, []);

  const elements = useStore(pageStore, (state) => state.items);

  console.log('elements:" ', elements);

  const bodyStore = getRootElementStore();

  if (!bodyStore) return null;

  const _id = bodyStore.getState()._id;

  return (
    <Sandbox>
      <DragAndDropEditor>
        <RenderElement key={_id} _id={_id} />
      </DragAndDropEditor>
    </Sandbox>
  );
}

export default EditorSandbox;
