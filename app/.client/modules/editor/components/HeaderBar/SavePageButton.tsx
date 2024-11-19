import { Button } from "@shopify/polaris";
import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import { RenderElement } from "../../render-root";
import {
  getAllElementStore,
  getRootElementStore,
} from "~/.client/stores/element-store";
import { authenticatedFetch } from "~/shopify/fns.client";
import { PAGE_ACTIONS } from "~/routes/api.page/constants";
import { useLocation, useParams, useSearchParams } from "@remix-run/react";
import { showToast } from "~/utils/showToast";
import { sleep } from "~/utils/sleep";
import { pageStore } from "~/.client/stores/page-store";

function SavePageButton() {
  const location = useLocation();
  const params = useParams();

  const onSavePageHandler = useCallback(async () => {
    showToast("Saving page");

    const bodyStore = getRootElementStore();

    if (!bodyStore) return null;

    const _id = bodyStore.getState()._id;

    let html = ReactDOMServer.renderToStaticMarkup(
      <RenderElement key={_id} _id={_id} />,
    );

    let cssText = "";

    const styleElement = document
      .querySelector("iframe")
      ?.contentDocument?.getElementById("dynamic-styles") as HTMLStyleElement;

    if (styleElement && styleElement.sheet && styleElement.sheet.cssRules) {
      cssText = Array.from(styleElement.sheet.cssRules)
        .map((rule) => rule.cssText)
        .join("\n");
    } else {
      console.log("No CSS rules found in the style element.");
    }

    const elementStores = getAllElementStore();

    const elements = elementStores.map((elementStore) => {
      const { ref, ...elementState } = elementStore.getState();

      return {
        ...elementState,
      };
    });

    // Save page
    const response = await authenticatedFetch("/api/page", {
      method: "POST",
      body: JSON.stringify({
        action: PAGE_ACTIONS["save-page"],
        pageData: {
          _id: params.id,
          title: pageStore.getState().title,
          elements,
          html,
          css: cssText,
        },
      }),
    });

    // Sleep 1 second to show enough toast
    await sleep(1000);

    if (response.success) {
      showToast("Saved page successfully");
    }

    if (!response.success) {
      console.error(response.message);
      showToast("Something went wrong");
    }
  }, []);

  return (
    <div style={{ display: "none" }}>
      <Button id="btn--save-page" variant="primary" onClick={onSavePageHandler}>
        Save
      </Button>
    </div>
  );
}

export default SavePageButton;
