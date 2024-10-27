import { Card, Text, Box } from "@shopify/polaris";

function RecentPages() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Recent pages
      </Text>
      <Box paddingBlock="200">
        <Text as="p" variant="bodyMd">
          This list only shows the most recently edited pages. Quickly access
          any pages shown below to pick up where you left off or preview your
          finished work.
        </Text>
      </Box>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          Content will be filled soon...
        </Text>
      </Box>
    </Card>
  );
}

export default RecentPages;
