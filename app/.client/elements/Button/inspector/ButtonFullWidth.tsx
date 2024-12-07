import { BlockStack, Box, Text } from "@shopify/polaris";
import { useCallback } from "react";
import { MultipleButtonToggle } from "~/.client/components/ButtonToggle";
import { useElementStyle } from "~/.client/stores/element-store";
import { AccordionList } from "~/components/Accordion";
import ButtonCenterInspector from "./ButtonCenter";

export const BUTTON_FULL_WIDTH_OPTIONS = [
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

function ButtonFullWidthInspector(props) {
  const { elementStore } = props;

  const { style, setStyle } = useElementStyle(elementStore);

  const _width = style?.["width"];

  // const width = parseInt(_width, 10)

  const selected = _width === "100%" ? [1] : [0];

  const onChangeButtonFullWidth = useCallback((value: string) => {
    setStyle({ width: `${value[0] ? "100%" : "unset"}` });
  }, []);

  return (
    <AccordionList
      items={[
        {
          open: true,
          label: "Layout",
          id: "layout",
          content: (
            <Box paddingBlockStart={"400"}>
              <BlockStack gap={"300"}>
                <Box>
                  <BlockStack gap={"150"}>
                    <Text as="p" variant="bodyMd">
                      {"Enable full width"}
                    </Text>
                    <MultipleButtonToggle
                      disableToggle
                      multiple={false}
                      options={BUTTON_FULL_WIDTH_OPTIONS}
                      onClick={onChangeButtonFullWidth}
                      selected={selected}
                    />
                  </BlockStack>
                </Box>

                {/* <ButtonCenterInspector {...props} /> */}
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default ButtonFullWidthInspector;
