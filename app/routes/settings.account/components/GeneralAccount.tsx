import { BlockStack, Card, InlineStack, Text } from "@shopify/polaris";
import type { ShopDocument } from "~/models/Shop";

function GeneralAccount(props: { shop: ShopDocument }) {
  const { shop } = props;

  const { shopConfig } = shop;

  return (
    <Card>
      <BlockStack gap={"200"}>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            General
          </Text>
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">
              Shop owner
            </Text>
            <Text as="p" variant="bodyMd">
              {shopConfig.shop_owner}
            </Text>
          </InlineStack>
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">
              Email
            </Text>
            <Text as="p" variant="bodyMd">
              {shopConfig.email}
            </Text>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}

export default GeneralAccount;
