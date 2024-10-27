import { BlockStack, Page, Text } from "@shopify/polaris";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";

export default withNavMenu(function Index(props: any) {
  return (
    <Page>
      <ui-title-bar title={"Dashboard"} />

      <BlockStack gap={"400"}>
        <Text as="h1" variant="headingLg">
          Hello World
        </Text>
      </BlockStack>
    </Page>
  );
});
