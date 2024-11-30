import {
  BlockStack,
  Box,
  Card,
  InlineStack,
  List,
  Text,
} from "@shopify/polaris";

function News() {
  return (
    <BlockStack gap={"400"}>
      <Text as="h2" variant="headingMd">
        What’s new
      </Text>
      <Card roundedAbove="sm">
        <InlineStack align="space-between">
          <Text as="h3" variant="headingSm">
            Designify 1.0.0
          </Text>

          <Text as="h3" variant="headingSm">
            Released: October 31, 2023
          </Text>
        </InlineStack>
        <Box paddingBlock="200">
          <BlockStack gap={"400"}>
            <Box
              background="bg-surface-secondary"
              padding={"400"}
              borderRadius="200"
            >
              Features
              <List.Item>Implement page editor</List.Item>
              Fixed
              <List.Item>Fixed bug</List.Item>
            </Box>
          </BlockStack>
        </Box>
      </Card>
    </BlockStack>
  );
}

export default News;
