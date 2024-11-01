import { BlockStack, Page, Text } from "@shopify/polaris";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import RecentPages from "./components/RecentPages";

export default withNavMenu(function Index(props: any) {
  return (
    <Page>
      <ui-title-bar title={"Dashboard"} />

      <BlockStack gap={"400"}>
        <RecentPages />
      </BlockStack>
    </Page>
  );
});
