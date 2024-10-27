import { BlockStack, Page, Text } from "@shopify/polaris";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";

export default withNavMenu(function Index(props: any) {
  return (
    <Page>
      <ui-title-bar title={"Pages"} />

      <BlockStack gap={"400"}>
        <Text as="p" variant="bodyMd">
          Content will be filled soon...
        </Text>
      </BlockStack>
    </Page>
  );
});
