import React, { useCallback } from "react";
import {
  Box,
  Text,
  InlineStack,
  RangeSlider,
  TextField,
} from "@shopify/polaris";

import { useElementStyle } from "../../../../../../stores/element-store";

const MAXIMUM_RANGE_FONT_SIZE = 160;
const MINIMUM_RANGE_FONT_SIZE = 8;

const MAXIMUM_FONT_SIZE = 999;
const MINIMUM_FONT_SIZE = 1;

function FontSizeInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const fontSize =
    parseInt(style?.["font-size"], 10) || MINIMUM_RANGE_FONT_SIZE;

  const onChangeFontSize = useCallback((value: string) => {
    setStyle({ "font-size": `${value}px` });
  }, []);

  return (
    <Box>
      <Text as="p" variant="bodyMd">
        {"Font size"}
      </Text>
      <InlineStack
        gap={"200"}
        wrap={false}
        blockAlign="center"
        align="space-between"
      >
        <Box width="70%">
          <RangeSlider
            output
            label={"Font size"}
            labelHidden
            min={MINIMUM_RANGE_FONT_SIZE}
            max={MAXIMUM_RANGE_FONT_SIZE}
            step={1}
            value={fontSize}
            onChange={onChangeFontSize}
          />
        </Box>
        <Box width="30%">
          <div className="ds-input_field">
            <TextField
              autoComplete="off"
              label={"Font size"}
              labelHidden
              type="number"
              suffix="px"
              min={MINIMUM_FONT_SIZE}
              max={MAXIMUM_FONT_SIZE}
              value={fontSize}
              onChange={onChangeFontSize}
              onBlur={() => {
                if (fontSize > MAXIMUM_FONT_SIZE) {
                  onChangeFontSize(MAXIMUM_FONT_SIZE);
                }
              }}
            />
          </div>
        </Box>
      </InlineStack>
    </Box>
  );
}

export default FontSizeInspector;
