import React, { useCallback } from "react";
import EditorColorPicker from "../../../../../../components/ColorPicker";
import { useElementStyle } from "~/.client/stores/element-store";
import { BlockStack, Text } from "@shopify/polaris";

function ColorInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const color = style?.color;

  const onChangeHandler = useCallback((value: string) => {
    setStyle({ color: value });
  }, []);

  return (
    <BlockStack gap={"200"}>
      <Text as="h4" variant="bodyMd">
        Content color
      </Text>
      <EditorColorPicker value={color} onChange={onChangeHandler} />
    </BlockStack>
  );
}

export default ColorInspector;
