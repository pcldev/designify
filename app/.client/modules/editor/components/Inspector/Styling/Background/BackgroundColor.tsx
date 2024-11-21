import React, { useCallback } from "react";
import EditorColorPicker from "../../../../../../components/ColorPicker";
import { useElementStyle } from "~/.client/stores/element-store";
import { BlockStack, Box, Text } from "@shopify/polaris";
import { AccordionList } from "~/components/Accordion";

function BackgroundColorInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const backgroundColor = style?.["background-color"];

  const onChangeHandler = useCallback((value: string) => {
    setStyle({ "background-color": value });
  }, []);

  return (
    <AccordionList
      items={[
        {
          open: true,
          label: "Background",
          id: "background",
          content: (
            <Box paddingBlockStart={"400"}>
              <BlockStack gap={"200"}>
                <Text as="h4" variant="bodyMd">
                  Background color
                </Text>
                <EditorColorPicker
                  value={backgroundColor}
                  onChange={onChangeHandler}
                />
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default BackgroundColorInspector;
