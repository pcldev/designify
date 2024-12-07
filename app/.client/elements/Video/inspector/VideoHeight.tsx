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

function VideoHeightInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const height = parseInt(style?.["height"], 10) || MINIMUM_RANGE_WIDTH;

  const onChangeHeight = useCallback((value: string) => {
    setStyle({ height: `${value}px` });
  }, []);

  return (
    <Box padding={"400"}>
      <Text as="p" variant="bodyMd">
        {"Video height"}
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
            value={height}
            onChange={onChangeHeight}
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
              value={height}
              onChange={onChangeHeight}
              onBlur={() => {
                if (height > MAXIMUM_FONT_SIZE) {
                  onChangeHeight(MAXIMUM_FONT_SIZE);
                }
              }}
            />
          </div>
        </Box>
      </InlineStack>
    </Box>
  );
}

export default VideoHeightInspector;
