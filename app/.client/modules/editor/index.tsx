import { Fragment, memo, useEffect } from "react";
import { getRootElementStore } from "~/.client/stores/element-store";
import Sandbox from "./Sandbox";
import { clearPageStore, initPageStore } from "./page-store";
import { RenderElement } from "./render-root";

import { useLoaderData } from "@remix-run/react";
import { useStore } from "~/.client/libs/external-store";
import { pageStore } from "~/.client/stores/page-store";
import { loader } from "~/routes/pages.modal.$id/route";
import DragAndDropEditor from "./DragAndDropEditor";
import ShortcutEditor from "./ShortcutEditor";
import { EmptyPage } from "./EmptyPage";

function EditorSandbox() {
  const { page } = useLoaderData<typeof loader>();

  useEffect(() => {
    // Init page store
    initPageStore(page);

    return () => {
      // Clear page store when unmounting
      clearPageStore();
    };
  }, []);

  const elements = useStore(pageStore, (state) => state.items);

  // Is empty page
  const isEmpty = elements.length === 2 || elements.length === 0;

  const bodyStore = getRootElementStore();

  const bodyId = bodyStore?.getState()?._id;

  return (
    <Sandbox>
      <DragAndDropEditor>
        <ShortcutEditor>
          {bodyId ? (
            <Fragment>
              <RenderElement key={bodyId} _id={bodyId} />
              {isEmpty && <EmptyPage />}
            </Fragment>
          ) : null}
        </ShortcutEditor>
      </DragAndDropEditor>
    </Sandbox>
  );
}

export default memo(EditorSandbox);
