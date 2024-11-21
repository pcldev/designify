import { BlockStack, Box, TextField } from "@shopify/polaris";
import React, { useCallback } from "react";
import { useElementStyle } from "~/.client/stores/element-store";
import { AccordionList } from "~/components/Accordion";

function BorderRadiusInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const borderRadius = parseInt(style?.["border-radius"], 10) || 0;

  const onChangeHandler = useCallback((value: string) => {
    setStyle({ "border-radius": `${value}px` });
  }, []);

  return (
    <AccordionList
      items={[
        {
          open: true,
          label: "Border",
          id: "border",
          content: (
            <Box paddingBlockStart={"400"}>
              <BlockStack gap={"200"}>
                <TextField
                  label={"Border radius"}
                  autoComplete="off"
                  value={borderRadius}
                  onChange={onChangeHandler}
                  type="number"
                />
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default BorderRadiusInspector;
