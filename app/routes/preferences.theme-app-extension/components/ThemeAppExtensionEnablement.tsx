import { useRevalidator } from "@remix-run/react";
import { BlockStack, Button, Card, InlineStack, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { EActionType } from "~/constants/fetcher-keys";
import { authenticatedFetch } from "~/shopify/fns.client";
import { showToast } from "~/utils/showToast";

function ThemeAppExtensionEnablement(props: {
  enabledThemeAppExtension: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();

  const onEnableThemeAppExtension = useCallback(async () => {
    try {
      setLoading(true);

      await authenticatedFetch("/api/app", {
        method: "POST",
        body: JSON.stringify({
          action: EActionType.ENABLE_THEME_APP_EXTENSION,
          enabled: !props.enabledThemeAppExtension,
        }),
      });

      setLoading(false);
      showToast(
        `${props.enabledThemeAppExtension ? "Enable" : "Disable"} theme app extension successfully`,
      );

      revalidator.revalidate();
    } catch (e) {
      showToast(e instanceof Error ? e.message : (e as string));
      setLoading(false);
    }
  }, [props.enabledThemeAppExtension, revalidator]);

  return (
    <BlockStack gap={"800"}>
      <Card>
        <BlockStack gap="200">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Designify Theme Extension
            </Text>

            <Button
              variant="primary"
              loading={loading}
              onClick={onEnableThemeAppExtension}
            >
              {props.enabledThemeAppExtension ? "Disable" : "Enable"}
            </Button>
          </InlineStack>

          <Text as="span">
            This extension must be enabled for Designify live pages to work.
          </Text>
        </BlockStack>
      </Card>
    </BlockStack>
  );
}

export default ThemeAppExtensionEnablement;
