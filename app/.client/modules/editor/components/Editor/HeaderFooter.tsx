import React from "react";
import { Box, InlineStack } from "@shopify/polaris";

function HeaderFooter() {
  return (
    <Box
      background="bg-surface-secondary"
      width="100%"
      minHeight="20px"
      borderStartStartRadius="100"
      borderStartEndRadius="100"
      padding={"200"}
    >
      <InlineStack align="space-between">
        <Box
          width="84px"
          minHeight="20px"
          background="bg-fill-tertiary"
          borderRadius="100"
        ></Box>
        <InlineStack gap={"200"}>
          <Box
            width="84px"
            minHeight="20px"
            background="bg-fill-tertiary"
            borderRadius="100"
          ></Box>
          <Box
            width="84px"
            minHeight="20px"
            background="bg-fill-tertiary"
            borderRadius="100"
          ></Box>
          <Box
            width="84px"
            minHeight="20px"
            background="bg-fill-tertiary"
            borderRadius="100"
          ></Box>
        </InlineStack>
      </InlineStack>
    </Box>
  );
}

export default HeaderFooter;
