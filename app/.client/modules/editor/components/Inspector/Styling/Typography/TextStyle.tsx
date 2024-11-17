import { BlockStack, Box, Icon, Text } from "@shopify/polaris";
import { useCallback } from "react";

import { MultipleButtonToggle } from "~/.client/components/ButtonToggle";

import { useElementStyle } from "../../../../../../stores/element-store";

import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@shopify/polaris-icons";

export const TEXT_STYLE_OPTIONS = [
  { value: "bold", label: <Icon source={TextBoldIcon} /> },
  { value: "italic", label: <Icon source={TextItalicIcon} /> },
  { value: "underline", label: <Icon source={TextUnderlineIcon} /> },
];

export type TextStyle = {
  fontFamily: string;
  fontSize: number;
  color: string;
  textAlign: "left" | "center" | "right" | "justify";
  verticalAlign: string;
  textStyle: string[];
};

function getTextStyleInline(textStyle: TextStyle["textStyle"] = []) {
  // Initialize an empty array to store individual style strings

  const styles = {
    "font-weight": textStyle.includes("bold") ? "bold" : "",
    "font-style": textStyle.includes("italic") ? "italic" : "",
    "text-decoration": textStyle.includes("underline") ? "underline" : "",
  };

  return styles;
}

function TextStyleInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const textStyle = [
    style?.["font-weight"] || "",
    style?.["font-style"] || "",
    style?.["text-decoration-line"] || "",
  ];

  const onChangeTextStyleHandler = useCallback((textStyle: string[]) => {
    const styles = getTextStyleInline(textStyle);

    setStyle(styles);
  }, []);

  return (
    <Box>
      <BlockStack gap={"150"}>
        <Text as="p" variant="bodyMd">
          {"Text style"}
        </Text>
        <MultipleButtonToggle
          multiple
          options={TEXT_STYLE_OPTIONS}
          onClick={onChangeTextStyleHandler}
          selected={textStyle}
        />
      </BlockStack>
    </Box>
  );
}

export default TextStyleInspector;
