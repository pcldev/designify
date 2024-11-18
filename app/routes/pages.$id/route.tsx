import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useCallback, useEffect } from "react";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import { MODAL_ID } from "~/constants/modals";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { id } = params;

  return json({ id });
}

function Index() {
  const { id } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const onNavigate = useCallback(() => {
    const urlNavigator =
      window.shopify.designify?.modals?.[MODAL_ID.PAGE_EDITOR_MODAL]
        ?.urlNavigator || "/pages";

    navigate(urlNavigator);

    // Resets modals state
    window.shopify.designify = {
      ...window.shopify.designify,
      modals: {
        ...window.shopify.designify?.modals,
        [MODAL_ID.PAGE_EDITOR_MODAL]: {
          urlNavigator: "/pages",
        },
      },
    };
  }, [navigate]);

  useEffect(() => {
    const modal = document.getElementById(MODAL_ID.PAGE_EDITOR_MODAL) as any;

    // Show modal
    modal?.show();

    // Listen to modal close event
    modal?.addEventListener("hide", onNavigate);

    return () => modal?.removeEventListener("hide", onNavigate);
  }, [onNavigate]);

  return (
    <ui-modal
      id={MODAL_ID.PAGE_EDITOR_MODAL}
      variant="max"
      src={`/pages/modal/${id}`}
    >
      <ui-title-bar title="Designify">
        <button
          variant="primary"
          onClick={() => {
            const editorFrame = document.getElementById(
              MODAL_ID.PAGE_EDITOR_MODAL,
            ) as HTMLIFrameElement;
            const editorWindow = editorFrame.contentWindow as Window;
            const saveBtn = editorWindow.document.getElementById(
              "btn--save-page",
            ) as HTMLButtonElement;

            saveBtn?.click();
          }}
        >
          {"Save"}
        </button>
      </ui-title-bar>
    </ui-modal>
  );
}

export default withNavMenu(Index);
