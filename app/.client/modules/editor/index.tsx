import { useEffect } from "react";
import { getRootElementStore } from "~/.client/stores/element-store";
import Sandbox from "./Sandbox";
import { initPageStore } from "./page-store";
import { RenderElement } from "./render-root";

import { useLoaderData } from "@remix-run/react";
import { useStore } from "~/.client/libs/external-store";
import { pageStore } from "~/.client/stores/page-store";
import { loader } from "~/routes/pages.modal.$id/route";
import DragAndDropEditor from "./DragAndDropEditor";

function EditorSandbox() {
  const { page } = useLoaderData<typeof loader>();

  useEffect(() => {
    // Init page store
    initPageStore(page);
  }, []);

  const elements = useStore(pageStore, (state) => state.items);

  const bodyStore = getRootElementStore();

  const bodyId = bodyStore?.getState()?._id;

  return (
    <Sandbox>
      <DragAndDropEditor>
        {bodyId ? <RenderElement key={bodyId} _id={bodyId} /> : null}
      </DragAndDropEditor>
    </Sandbox>
  );
}

export default EditorSandbox;
