import { useParams } from "@remix-run/react";
import { Button, InlineStack } from "@shopify/polaris";
import { ViewIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { useStore } from "~/.client/libs/external-store";
import { pageStore } from "~/.client/stores/page-store";
import { PAGE_ACTIONS } from "~/routes/api.page/constants";
import { authenticatedFetch } from "~/shopify/fns.client";
import { showToast } from "~/utils/showToast";

function PublishPageButton() {
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const pageStoreState = useStore(pageStore, (state) => state);

  const handle = pageStoreState.handle;
  const publishedAt = pageStoreState.publishedAt;

  const onPublishPageHandler = useCallback(async () => {
    setLoading(true);
    showToast("Publishing page");

    // Save page
    const response = await authenticatedFetch("/api/page", {
      method: "POST",
      body: JSON.stringify({
        action: PAGE_ACTIONS["publish-page"],
        _id: params.id,
      }),
    });

    if (response.success) {
      showToast("Published page successfully");

      const updatedPage = response.pageMutation.page;

      const { handle } = updatedPage;
      const publishedAt = new Date();

      pageStore.dispatch({
        type: "SET_STATE",
        payload: {
          state: {
            handle,
            publishedAt,
          },
        },
      });
    }

    if (!response.success) {
      console.error(response.message);
      showToast("Something went wrong");
    }

    setLoading(false);
  }, []);

  const onUnpublishPageHandler = useCallback(async () => {
    setLoading(true);
    showToast("Unpublishing page");

    // Unpublish page
    const response = await authenticatedFetch("/api/page", {
      method: "POST",
      body: JSON.stringify({
        action: PAGE_ACTIONS["unpublish-page"],
        _id: params.id,
      }),
    });

    if (response.success) {
      showToast("Unpublished page successfully");

      const handle = "";
      const publishedAt = null;

      pageStore.dispatch({
        type: "SET_STATE",
        payload: {
          state: {
            handle,
            publishedAt,
          },
        },
      });
    }

    if (!response.success) {
      console.error(response.message);
      showToast("Something went wrong");
    }

    setLoading(false);
  }, []);

  const onViewLivePage = useCallback((handle?: string) => {
    window.open(`https://${shopify.config.shop}/pages/${handle}`);
  }, []);

  return (
    <InlineStack gap={"200"}>
      <Button
        id="btn--save-page"
        variant="primary"
        onClick={onPublishPageHandler}
        loading={loading}
      >
        Publish
      </Button>

      {handle && publishedAt && (
        <InlineStack gap={"150"}>
          <Button
            icon={ViewIcon}
            variant="secondary"
            onClick={() => onViewLivePage(handle)}
          >
            View live
          </Button>

          <Button
            icon={ViewIcon}
            variant="secondary"
            loading={loading}
            onClick={() => onUnpublishPageHandler()}
          >
            Unpublish
          </Button>
        </InlineStack>
      )}
    </InlineStack>
  );
}

export default PublishPageButton;
