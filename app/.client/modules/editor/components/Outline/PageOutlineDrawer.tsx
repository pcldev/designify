import { Box, InlineStack, Text } from "@shopify/polaris";
import ElementsCatalog from "./ElementsCatalog";

function PageOutlineDrawer() {
  return (
    <div className="page-outline-drawer h-100">
      <Box borderInlineEndWidth="025" borderColor="border" minHeight="100%">
        <Box
          paddingBlock={"300"}
          paddingInline={"400"}
          borderBlockEndWidth="025"
          borderColor="border"
        >
          <Text as="h2" variant="headingMd">
            Elements
          </Text>
        </Box>
        <Box
          paddingBlock={"300"}
          paddingInline={"400"}
          borderBlockEndWidth="025"
          borderColor="border"
        >
          <Box background="bg" borderRadius="200" paddingBlock={"150"}>
            <InlineStack align="center">
              <Text as="span" variant="headingSm">
                Try drag and drop
              </Text>
            </InlineStack>
          </Box>
        </Box>

        <ElementsCatalog />
      </Box>
    </div>
  );
}

export default PageOutlineDrawer;
