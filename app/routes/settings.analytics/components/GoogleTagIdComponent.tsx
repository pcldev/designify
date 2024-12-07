import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { EActionType } from "~/constants/fetcher-keys";
import { authenticatedFetch } from "~/shopify/fns.client";
import { showToast } from "~/utils/showToast";

function GoogleTagIdComponent(props: { ga4Code: string }) {
  const [ga4Code, setGa4Code] = useState(props.ga4Code);
  const [loading, setLoading] = useState(false);

  const onChangeGoogleTagIdHandler = useCallback((value: string) => {
    setGa4Code(value);
  }, []);

  const onSaveGA4CodeHandler = useCallback(async () => {
    try {
      if (!ga4Code.startsWith("G-")) {
        throw new Error("Invalid code");
      }

      setLoading(true);

      await authenticatedFetch("/api/app", {
        method: "POST",
        body: JSON.stringify({
          action: EActionType.SET_GA4_CODE,
          ga4Code,
        }),
      });

      setLoading(false);
      showToast("Saved GA4 code successfully");
    } catch (e) {
      showToast(e instanceof Error ? e.message : (e as string));
      setLoading(false);
    }
  }, [ga4Code]);

  return (
    <BlockStack gap={"800"}>
      <Card>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Google tag ID
          </Text>

          <TextField
            autoComplete="off"
            label="Google tag id"
            labelHidden
            placeholder="G-XXXXXX"
            value={ga4Code}
            onChange={onChangeGoogleTagIdHandler}
          />

          <Text as="span">Google tag ID for Google Analytics 4 properties</Text>
        </BlockStack>
      </Card>

      <InlineStack align="end">
        <Button
          variant="primary"
          loading={loading}
          onClick={onSaveGA4CodeHandler}
        >
          Save
        </Button>
      </InlineStack>
    </BlockStack>
  );
}

export default GoogleTagIdComponent;
