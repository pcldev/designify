import React from "react";
import { Box, BlockStack, Icon, Text } from "@shopify/polaris";
import { IconsIcon } from "@shopify/polaris-icons";

function EmptyInspector(props) {
  return (
    <Box padding={"400"}>
      <BlockStack gap={"200"} align="start">
        <div className="Polaris-Icon-Custom">
          <Icon source={IconsIcon} tone="base" />
        </div>
        <Text as="h3" variant="headingMd">
          Add elements
        </Text>
        <Text as="p" variant="bodyMd">
          Select, drag, and drop your element variants of choice into the
          canvas.
        </Text>
      </BlockStack>
    </Box>
  );
}

export default EmptyInspector;
