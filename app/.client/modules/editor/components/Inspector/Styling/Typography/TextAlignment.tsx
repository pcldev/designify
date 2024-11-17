import { useCallback } from "react";

import { BlockStack, Box, Icon, Text } from "@shopify/polaris";

import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@shopify/polaris-icons";

import {
  MultipleButtonToggle,
  OptionButtonToggle,
} from "~/.client/components/ButtonToggle";

import { useElementStyle } from "../../../../../../stores/element-store";

const PolarisTextJustify = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="Polaris-Icon__Svg"
  >
    <path d="M3 3H17C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4C18 4.26522 17.8946 4.51957 17.7071 4.70711C17.5196 4.89464 17.2652 5 17 5H3C2.73478 5 2.48043 4.89464 2.29289 4.70711C2.10536 4.51957 2 4.26522 2 4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM3 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H3C2.73478 9 2.48043 8.89464 2.29289 8.70711C2.10536 8.51957 2 8.26522 2 8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7ZM3 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13H3C2.73478 13 2.48043 12.8946 2.29289 12.7071C2.10536 12.5196 2 12.2652 2 12C2 11.7348 2.10536 11.4804 2.29289 11.2929C2.48043 11.1054 2.73478 11 3 11ZM3 15H17C17.2652 15 17.5196 15.1054 17.7071 15.2929C17.8946 15.4804 18 15.7348 18 16C18 16.2652 17.8946 16.5196 17.7071 16.7071C17.5196 16.8946 17.2652 17 17 17H3C2.73478 17 2.48043 16.8946 2.29289 16.7071C2.10536 16.5196 2 16.2652 2 16C2 15.7348 2.10536 15.4804 2.29289 15.2929C2.48043 15.1054 2.73478 15 3 15Z" />
  </svg>
);

export const TEXT_ALIGNMENT_OPTIONS = [
  { value: "left", label: <Icon source={TextAlignLeftIcon} /> },
  { value: "center", label: <Icon source={TextAlignCenterIcon} /> },
  { value: "right", label: <Icon source={TextAlignRightIcon} /> },

  {
    value: "justify",
    label: (
      <span className={"Polaris-Icon"}>{PolarisTextJustify}</span>
    ) as OptionButtonToggle["label"],
  },
];

function TextAlignmentInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const textAlignment = style?.["text-align"] || "";

  const onChangeTextAlignmentHandler = useCallback((value: string) => {
    setStyle({ "text-align": `${value}` });
  }, []);

  return (
    <Box>
      <BlockStack gap={"150"}>
        <Text as="p" variant="bodyMd">
          {"Text alignment"}
        </Text>
        <MultipleButtonToggle
          disableToggle
          options={TEXT_ALIGNMENT_OPTIONS}
          onClick={onChangeTextAlignmentHandler}
          selected={textAlignment}
        />
      </BlockStack>
    </Box>
  );
}

export default TextAlignmentInspector;
