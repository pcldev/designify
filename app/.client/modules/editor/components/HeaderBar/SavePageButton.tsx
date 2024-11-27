import { useParams } from "@remix-run/react";
import { Button } from "@shopify/polaris";
import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import {
  getAllElementStore,
  getRootElementStore,
} from "~/.client/stores/element-store";
import { pageStore } from "~/.client/stores/page-store";
import { PAGE_ACTIONS } from "~/routes/api.page/constants";
import { authenticatedFetch } from "~/shopify/fns.client";
import { showToast } from "~/utils/showToast";
import { getElementSelector } from "../../configs";
import { RenderElement } from "../../render-root";
import { getCssTextByClassName } from "../../styleInstanceStore";

function SavePageButton() {
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

      const _id = elementState._id;
      const elementSelector = getElementSelector(_id);
      return {
        ...elementState,
        styles: {
          _id: _id,
          styles: getCssTextByClassName(styleElement, elementSelector)
            ?.trim()
            .split(elementSelector)[1],
        },
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
