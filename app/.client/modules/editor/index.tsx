import React from "react";
import Sandbox from "./Sandbox";
import { RenderElement } from "./render-root";
import { initPageStore } from "./page-store";
import {
  getElementStoreById,
  getRootElementStore,
} from "~/.client/stores/element-store";

import DragAndDropEditor from "./DragAndDropEditor";

function EditorSandbox() {
  // Init page store
  initPageStore();

  const bodyStore = getRootElementStore();

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
