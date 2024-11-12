import { Box, InlineStack } from "@shopify/polaris";
import React from "react";

interface PresetColorsProps {
  onSelect: (hex: string) => void;
}

const PresetColors = (props: PresetColorsProps) => {
  const { onSelect } = props;
  return (
    <InlineStack gap="200">
      {[
        "#D0021B",
        "#F5A623",
        "#F8E71C",
        "#8B572A",
        "#7ED321",
        "#417505",
        "#BD10E0",
        "#9013FE",
        "#4A90E2",
        "#50E3C2",
        "#B8E986",
        "#000000",
        "#4A4A4A",
        "#9B9B9B",
        "#FFFFFF",
      ].map((color) => {
        return (
          <Box
            key={color}
            width="24px"
            minHeight="24px"
            borderWidth="025"
            borderColor="border"
            borderRadius="full"
            overflowX="hidden"
            overflowY="hidden"
          >
            <div
              style={{
                background: color,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={() => onSelect(color)}
            />
          </Box>
        );
      })}
    </InlineStack>
  );
};

export default PresetColors;
