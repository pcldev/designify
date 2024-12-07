import React, { useCallback } from "react";
import {
  Box,
  Text,
  InlineStack,
  RangeSlider,
  TextField,
} from "@shopify/polaris";

import { useElementStyle } from "~/.client/stores/element-store";

const MAXIMUM_RANGE_FONT_SIZE = 1000;
const MINIMUM_RANGE_WIDTH = 100;

const MAXIMUM_FONT_SIZE = 999;
const MINIMUM_FONT_SIZE = 1;

function VideoWidthInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const width = parseInt(style?.["width"], 10) || MINIMUM_RANGE_WIDTH;

  const onChangeWidth = useCallback((value: string) => {
    setStyle({ width: `${value}px` });
  }, []);

  return (
    <Box padding={"400"}>
      <Text as="p" variant="bodyMd">
        {"Video width"}
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
            label={"Width"}
            labelHidden
            min={MINIMUM_RANGE_WIDTH}
            max={MAXIMUM_RANGE_FONT_SIZE}
            step={1}
            value={width}
            onChange={onChangeWidth}
          />
        </Box>
        <Box width="30%">
          <div className="ds-input_field">
            <TextField
              autoComplete="off"
              label={"Width"}
              labelHidden
              type="number"
              suffix="px"
              min={MINIMUM_FONT_SIZE}
              max={MAXIMUM_FONT_SIZE}
              value={width}
              onChange={onChangeWidth}
              onBlur={() => {
                if (width > MAXIMUM_FONT_SIZE) {
                  onChangeWidth(MAXIMUM_FONT_SIZE);
                }
              }}
            />
          </div>
        </Box>
      </InlineStack>
    </Box>
  );
}

export default VideoWidthInspector;
