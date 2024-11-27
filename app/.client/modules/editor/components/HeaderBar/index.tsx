import { Box, InlineStack } from "@shopify/polaris";
import PageTitle from "./PageTitle";
import SavePageButton from "./SavePageButton";
import PublishPageButton from "./PublishPageButton";

function HeaderBar() {
  return (
    <Box
      id="page-header"
      paddingBlock="200"
      paddingInline={"400"}
      borderBlockEndWidth="025"
      borderColor="border"
      position="relative"
    >
      <InlineStack blockAlign="center" gap={"300"} align="space-between">
        <PageTitle />

        <InlineStack gap={"200"}>
          <SavePageButton />
          <PublishPageButton />
        </InlineStack>
      </InlineStack>
    </Box>
  );
}

export default HeaderBar;
