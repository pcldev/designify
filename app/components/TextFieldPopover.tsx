import { useCallback, useEffect, useRef, useState } from "react";
import { BlockStack, Box, Popover, TextField } from "@shopify/polaris";

interface ITextFieldPopoverProps {
  value: string;
  setValue: (value: string) => any;
  label: string;
  labelHidden?: boolean;
  activator: any;
  maxLength: number;
  onBlur?: (e?: any) => void;
}

export default function TextFieldPopover(props: ITextFieldPopoverProps) {
  const {
    value,
    setValue,
    label,
    labelHidden,
    activator,
    maxLength,
    onBlur: onBlurProp,
  } = props;
  const [popoverActive, setPopoverActive] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const togglePopoverActive = useCallback(() => {
    // Validate input
    const tempName = value.trim();

    if (!tempName.length) {
      return;
    }

    setValue(tempName);
    setPopoverActive((popoverActive) => !popoverActive);
  }, [setValue, value]);

  const onBlur = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        togglePopoverActive();
        onBlurProp && onBlurProp(e);
      }
    },
    [onBlurProp, togglePopoverActive],
  );

  useEffect(() => {
    const elm = inputRef.current;

    elm?.addEventListener("keydown", onBlur);

    return () => elm?.removeEventListener("keydown", onBlur);
  }, [onBlur]);

  const _activator = <div onClick={togglePopoverActive}>{activator}</div>;

  return (
    <Popover
      active={popoverActive}
      activator={_activator}
      onClose={togglePopoverActive}
      preferredAlignment="left"
    >
      <Popover.Section>
        <Box paddingBlockEnd={"200"}>
          <BlockStack gap={"200"}>
            <div ref={inputRef}>
              <TextField
                showCharacterCount
                label={label}
                value={value}
                autoComplete="off"
                onChange={setValue}
                maxLength={maxLength}
                labelHidden={labelHidden}
                {...(!value?.trim().length
                  ? { error: "Title can not be empty" }
                  : {})}
                {...(onBlurProp ? { onBlur: onBlurProp } : {})}
              />
            </div>
          </BlockStack>
        </Box>
      </Popover.Section>
    </Popover>
  );
}
