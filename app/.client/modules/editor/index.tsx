import { Fragment, memo, useEffect } from "react";
import { getRootElementStore } from "~/.client/stores/element-store";
import Sandbox from "./Sandbox";
import { clearPageStore, initPageStore } from "./page-store";
import { RenderElement } from "./render-root";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useStore } from "~/.client/libs/external-store";
import { pageStore } from "~/.client/stores/page-store";
import { loader } from "~/routes/pages.modal.$id/route";
import DragAndDropEditor from "./DragAndDropEditor";
import { EmptyPage } from "./EmptyPage";
import ShortcutEditor from "./ShortcutEditor";

function EditorSandbox() {
  const { page } = useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pageTemplateId = searchParams.get("template");

    // Init page store
    initPageStore(page, pageTemplateId);

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
