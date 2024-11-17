import type { ButtonProps, IconSource } from "@shopify/polaris";
import { Box, Button, InlineStack } from "@shopify/polaris";
import type { JSXElementConstructor, ReactElement } from "react";
import React from "react";

export type OptionButtonToggle = {
  value: any;
  label: ReactElement<any, string | JSXElementConstructor<any>> | IconSource;
};

interface IMultipleButtonToggleProps {
  multiple?: boolean;
  disableToggle?: boolean;
  selected: any[];
  options: OptionButtonToggle[];
  onClick: (value: any[]) => void;
}

export const MultipleButtonToggle = ({
  options,
  ...otherProps
}: IMultipleButtonToggleProps) => {
  return (
    <Box
      borderRadius="200"
      background="bg-fill-secondary"
      padding={"050"}
      width="100%"
    >
      <InlineStack wrap={false}>
        {options.map((opt) => (
          <ButtonToggle key={opt.value} option={opt} {...otherProps} />
        ))}
      </InlineStack>
    </Box>
  );
};

const ButtonToggle = ({
  multiple,
  disableToggle,
  option,
  selected,
  onClick,
}: Omit<IMultipleButtonToggleProps, "options"> & {
  option: OptionButtonToggle;
}) => {
  const onHandleClick = () => {
    if (disableToggle && selected.includes(option.value)) {
      return;
    }

    let updatedValue;

    if (multiple) {
      updatedValue = selected.includes(option.value)
        ? selected.filter((s) => s !== option.value)
        : [...selected, option.value];
    } else {
      updatedValue = selected.includes(option.value) ? [] : [option.value];
    }

    onClick(updatedValue);
  };

  return (
    <StyledInspectorBtn
      icon={option.label}
      onClick={onHandleClick}
      variant={selected.includes(option.value) ? "secondary" : "tertiary"}
    />
  );
};

const StyledInspectorBtn = (props: ButtonProps) => {
  const { disabled, variant, ...restProps } = props;

  return (
    <div className={`ds-button_toggle ${disabled ? "ds-button-disabled" : ""}`}>
      <Button
        fullWidth
        disabled={disabled && !!variant}
        variant={variant}
        {...restProps}
      />
    </div>
  );
};
