import {
  BlockStack,
  Box,
  Divider,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import _ from "lodash";
import { useCallback } from "react";
import { useElementStyle } from "~/.client/stores/element-store";
import { AccordionList } from "~/components/Accordion";

function SpacingInspector(props) {
  return (
    <AccordionList
      items={[
        {
          open: true,
          label: "Spacing",
          id: "spacing",
          content: (
            <Box paddingBlockStart={"400"}>
              <BlockStack gap={"200"}>
                <SpacingComponent type="padding" {...props} />
                <Divider borderColor="border" />
                <SpacingComponent type="margin" {...props} />
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default SpacingInspector;

interface ISpacingComponent {
  type: "padding" | "margin";
  elementStore: any;
}

function SpacingComponent(props: ISpacingComponent) {
  const { type, elementStore } = props;

  const { style, setStyle } = useElementStyle(elementStore);

  const spacingTop = parseInt(style?.[`${type}-top`], 10) || 0;
  const spacingBottom = parseInt(style?.[`${type}-bottom`], 10) || 0;
  const spacingLeft = parseInt(style?.[`${type}-left`], 10) || 0;
  const spacingRight = parseInt(style?.[`${type}-right`], 10) || 0;

  const onChangeHandler = useCallback(
    (value: string, direction: "top" | "left" | "bottom" | "right") => {
      setStyle({ [`${type}-${direction}`]: `${value}px` });
    },
    [],
  );

  return (
    <Box>
      <div className="ds-input_field">
        <BlockStack gap={"200"}>
          <Text as="h3" variant="bodyLg">
            {_.capitalize(type)}
          </Text>
          <InlineStack align="center">
            <TextField
              label={_.capitalize(type)}
              labelHidden
              autoComplete="off"
              value={spacingTop}
              onChange={(value) => onChangeHandler(value, "top")}
              suffix="px"
              type="number"
            />
          </InlineStack>
          <InlineStack align="center" gap={"100"} wrap={false}>
            <TextField
              label={_.capitalize(type)}
              labelHidden
              autoComplete="off"
              value={spacingLeft}
              onChange={(value) => onChangeHandler(value, "left")}
              suffix="px"
              type="number"
            />
            <TextField
              label={_.capitalize(type)}
              labelHidden
              autoComplete="off"
              value={spacingRight}
              onChange={(value) => onChangeHandler(value, "right")}
              suffix="px"
              type="number"
            />
          </InlineStack>
          <InlineStack align="center">
            <TextField
              label={_.capitalize(type)}
              labelHidden
              autoComplete="off"
              value={spacingBottom}
              onChange={(value) => onChangeHandler(value, "bottom")}
              suffix="px"
              type="number"
            />
          </InlineStack>
        </BlockStack>
      </div>
    </Box>
  );
}
