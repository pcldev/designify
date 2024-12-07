import { BlockStack, Box, Text } from "@shopify/polaris";
import { useCallback } from "react";
import { MultipleButtonToggle } from "~/.client/components/ButtonToggle";
import { useElementStyle } from "~/.client/stores/element-store";

import React from "react";

export const BUTTON_CENTER_OPTIONS = [
  {
    value: 1,
    label: (
      <Text as="span" variant="bodyMd">
        Yes
      </Text>
    ),
  },
  {
    value: 0,
    label: (
      <Text as="span" variant="bodyMd">
        No
      </Text>
    ),
  },
];

function ButtonCenterInspector(props) {
  const { elementStore } = props;

  const { style, setStyle } = useElementStyle(elementStore);

  const display = style?.["display"];

  const selected = display === "flex" ? [1] : [0];

  const onChangeButtonFullWidth = useCallback((value: string) => {
    console.log("valueL ", value);
    setStyle({
      ...(value[0]
        ? {
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
          }
        : {
            display: "block",
          }),
    });
  }, []);

  return (
    <Box>
      <BlockStack gap={"150"}>
        <Text as="p" variant="bodyMd">
          {"Center The Block"}
        </Text>
        <MultipleButtonToggle
          disableToggle
          multiple={false}
          options={BUTTON_CENTER_OPTIONS}
          onClick={onChangeButtonFullWidth}
          selected={selected}
        />
      </BlockStack>
    </Box>
  );
}

export default ButtonCenterInspector;
