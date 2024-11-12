/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines */
import InputColorPicker from "./InputPrefix";
import PresetColors from "./PresetColors";
import type { HSBAColor, HSBColor, RGBAColor } from "@shopify/polaris";
import {
  BlockStack,
  Box,
  Button,
  ColorPicker,
  Divider,
  InlineGrid,
  InlineStack,
  Popover,
  Text,
  TextField,
  hsbToRgb,
  rgbToHsb,
  rgbaString,
} from "@shopify/polaris";
import { XCircleIcon } from "@shopify/polaris-icons";
import { type PopoverOverlayProps } from "@shopify/polaris/build/ts/src/components/Popover/components";
import React, { type ReactNode, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { useColors } from "../../utils/hooks/useColors";

export interface ColorPickerInterface {
  value?: string;
  placeholder?: string;
  onChange?: (color: string, notPushHistory?: boolean) => void;
  activator?: ReactNode;
  hasFooterSave?: boolean;
  defaultVisible?: boolean;
  onClosePopup?: () => void;
  onClear?: () => void;
  id?: string;
  preferredAlignment?: PopoverOverlayProps["preferredAlignment"];
}

export function convertTinycolorToPolarisColor(
  color: tinycolor.ColorFormats.RGBA,
): RGBAColor {
  const { r, g, b, a } = color;
  return { red: r, green: g, blue: b, alpha: a };
}

// TODO: make this one reusable
const EditorColorPicker: React.FC<ColorPickerInterface> = ({
  value,
  placeholder,
  onChange,
  onClear,
  activator = null,
  hasFooterSave = false,
  defaultVisible = null,
  onClosePopup,
  id,
  preferredAlignment = "center",
}: any) => {
  const [focusInput, setFocusInput] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shouldFocusInputField, setShouldFocusInputField] = useState(false);
  const [colorInputValue, setColorInputValue] = useState(value);
  const color = tinycolor(value);
  const { rgbColor, hexColor, hsbColor } = useColors(color);

  const [focus, setFocus] = useState("");
  const [displayValues, setDisplayValues] = useState({
    r: rgbColor.r,
    g: rgbColor.g,
    b: rgbColor.b,
    a: Math.round(rgbColor.a * 100).toFixed(0),
    hex: hexColor,
  });
  const [colorLocalState, setColorLocalState] = useState(hsbColor);

  // Setup a flag which used to automatically focus on the input field when the popover becomes visible
  useEffect(() => {
    // Set a state variable to determine whether the input field should be focused
    setShouldFocusInputField(visible);
  }, [visible]);

  // Focus the input field when the popover is visible and the input field is not focused
  useEffect(() => {
    if (visible && !focusInput && shouldFocusInputField) {
      // Reset the shouldFocusInputField state to prevent repetitive focusing
      setShouldFocusInputField(false);

      // Set the focus on the input field
      setFocusInput(true);
    }
  }, [visible, focusInput, shouldFocusInputField]);

  const handleChangeLocalState = (value: HSBAColor) => {
    setColorLocalState(value);
    if (hasFooterSave) {
      onChangeColorHasFooterSave(value, false);
    } else {
      onChangeColor(value);
    }
  };

  const onChangeColorHasFooterSave = (color: HSBColor, push: boolean) => {
    const rgb = hsbToRgb(color);
    const rgbaStr = rgbaString(rgb);
    const c = tinycolor(rgbaStr);
    const tinyRgb = c.toRgb();
    const hex = c.toHex8String();
    const { r, g, b, a } = tinyRgb;

    setDisplayValues({
      ...displayValues,
      r,
      g,
      b,
      a: Math.round(a * 100).toFixed(0),
      hex,
    });

    if (push) {
      onChange(c.toRgbString());
    }
  };

  const onChangeColor = (color: HSBAColor) => {
    const rgb = hsbToRgb(color);
    const rgbaStr = rgbaString(rgb);
    const c = tinycolor(rgbaStr);
    const tinyRgb = c.toRgb();
    const hex = c.toHex8String();

    onChange(c.toRgbString());
    setColorInputValue(c.toRgbString());
    const { r, g, b, a } = tinyRgb;
    setDisplayValues({
      ...displayValues,
      r,
      g,
      b,
      a: Math.round(a * 100).toFixed(0),
      hex,
    });
  };

  const onSelectPresetColor = (hexColor: string) => {
    const color = tinycolor(hexColor);
    const rgbString = color.toRgbString();
    const hsbColor = rgbToHsb(convertTinycolorToPolarisColor(color.toRgb()));
    const { r, g, b, a: alpha } = color.toRgb();

    if (!hasFooterSave) {
      onChange(rgbString);
    }

    setColorLocalState(hsbColor);
    setColorInputValue(rgbString);
    setDisplayValues({
      r,
      g,
      b,
      a: Math.round(alpha * 100).toFixed(0),
      hex: color.toHex8String(),
    });
  };

  const onChangeInput = (name: string, value: string) => {
    setDisplayValues({ ...displayValues, [name]: value });
  };

  useEffect(() => {
    setColorInputValue(value);
    setColorLocalState(hsbColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    let color = tinycolor("");
    if (focus === "hex") {
      const { hex } = displayValues;
      color = tinycolor(hex);
    } else if (focus) {
      const { r, g, b, a } = displayValues;
      color = tinycolor({ r, g, b, a: parseFloat(a) / 100 });
    }
    const rgbString = color.toRgbString();

    if (color.isValid() && focus && hasFooterSave) {
      const hsbColor = rgbToHsb(convertTinycolorToPolarisColor(color.toRgb()));
      setColorLocalState(hsbColor);
      return;
    }

    if (color.isValid() && focus && value !== rgbString && !hasFooterSave) {
      setColorInputValue(rgbString);
      setColorLocalState(
        rgbToHsb(convertTinycolorToPolarisColor(color.toRgb())),
      );
      onChange(rgbString);
    }
  }, [displayValues]);

  const onBlur = () => {
    const rgbString = color.toRgbString();
    setFocusInput(false);
    setFocus("");
    const { r, g, b, a: alpha } = rgbColor;

    if (hasFooterSave) {
      let color = tinycolor("");
      if (focus === "hex") {
        const { hex } = displayValues;
        color = tinycolor(hex);
      } else if (focus) {
        const { r, g, b, a } = displayValues;
        color = tinycolor({ r, g, b, a: parseFloat(a) / 100 });
      }
      const objectColor = color.toRgb();
      const { r, g, b, a } = objectColor;
      setDisplayValues({
        r,
        g,
        b,
        a: Math.round(a * 100).toFixed(0),
        hex: displayValues?.hex,
      });
      return;
    }

    if (color.isValid() && value !== rgbString && !hasFooterSave) {
      setColorInputValue(rgbString);
      onChange(rgbString);
    }

    setDisplayValues({
      r,
      g,
      b,
      a: Math.round(alpha * 100).toFixed(0),
      hex: hexColor,
    });
  };

  const handleClear = () => {
    typeof onClear === "function" && onClear();
    setColorInputValue("");
  };

  const handleFocusInput = () => {
    // Input is not focused or the popover is not open, open the popover.
    if (!focusInput || !visible) {
      setVisible(true);
      setFocusInput(true);
      return;
    }

    // Input is focused and the popover is open, close the popover.
    if (focusInput && visible) {
      setVisible(false);
    }
  };

  const handleSaveFooter = () => {
    onChangeColorHasFooterSave(colorLocalState, true);

    if (typeof onClosePopup === "function") {
      setVisible(false);
      onClosePopup?.();
    } else {
      setVisible(false);
    }
  };

  const activatorComp = (
    <div onClick={handleFocusInput}>
      {activator ? (
        activator
      ) : (
        <TextField
          id={`${id}--input`}
          focused={focusInput}
          label="Value"
          labelHidden
          autoComplete="off"
          value={colorInputValue}
          onChange={(v) => {
            setColorInputValue(v);
            if (tinycolor(v).isValid()) {
              onChange(v);
              const rgbColor = tinycolor(v).toRgb();
              const { r, g, b, a: alpha } = rgbColor;
              setDisplayValues({
                r,
                g,
                b,
                a: Math.round(alpha * 100).toFixed(0),
                hex: hexColor,
              });
            }
          }}
          placeholder={placeholder}
          spellCheck={false}
          onBlur={() => {
            onBlur();
          }}
          prefix={
            <div
              onClick={(e) => {
                e.stopPropagation();
                setFocusInput(true);
                setVisible(!visible);
              }}
            >
              <InputColorPicker
                value={value || placeholder}
                setVisible={setVisible}
                visible={visible}
              />
            </div>
          }
          suffix={
            <div
              style={{
                visibility:
                  typeof onClear === "function" && colorInputValue
                    ? "visible"
                    : "hidden",
              }}
            >
              <InlineStack align={"center"} blockAlign={"center"}>
                <Button
                  icon={XCircleIcon}
                  textAlign={"center"}
                  onClick={handleClear}
                  variant="plain"
                />
              </InlineStack>
            </div>
          }
        />
      )}
    </div>
  );

  return (
    <Popover
      active={typeof defaultVisible === "boolean" ? defaultVisible : visible}
      activator={activatorComp}
      onClose={() => {
        setVisible(false);
        onClosePopup?.();
      }}
      preventFocusOnClose
      ariaHaspopup={"dialog"}
      sectioned
      preferredPosition={"above"}
      preferInputActivator
      preferredAlignment={preferredAlignment}
      fluidContent
      preventCloseOnChildOverlayClick
      zIndexOverride={1000}
    >
      <Box
        width={"300px"}
        padding="100"
        paddingBlockStart="200"
        paddingBlockEnd="200"
        id={`${id}--color-picker-box`}
      >
        <BlockStack gap="200">
          <ColorPicker
            id={`${id}--color-picker`}
            fullWidth
            color={colorLocalState}
            onChange={handleChangeLocalState}
            allowAlpha
          />
          <InlineGrid gap="150" columns={"80px repeat(4, auto)"}>
            <BlockStack>
              <Text variant="bodyMd" as="span">
                Hex
              </Text>
              <TextField
                id={`${id}--color-picker--hex`}
                label="Hex"
                labelHidden
                autoComplete="off"
                inputMode="numeric"
                value={displayValues.hex}
                onChange={(value) => {
                  onChangeInput("hex", value);
                }}
                onBlur={onBlur}
                onFocus={() => setFocus("hex")}
              />
            </BlockStack>
            {["r", "g", "b", "a"].map((label) => (
              <BlockStack inlineAlign="center" key={label}>
                <Text variant="bodyMd" as="span">
                  {label.toUpperCase()}
                </Text>
                <TextField
                  id={`${id}--color-picker--${label}`}
                  label={label.toUpperCase()}
                  labelHidden
                  autoComplete="off"
                  min={0}
                  max={255}
                  inputMode="numeric"
                  value={(displayValues as any)?.[label]?.toString()}
                  onChange={(value) => onChangeInput(label, value)}
                  onFocus={() => setFocus(label)}
                  onBlur={onBlur}
                />
              </BlockStack>
            ))}
          </InlineGrid>
          <Divider />
          <PresetColors onSelect={onSelectPresetColor} />
          {hasFooterSave && (
            <>
              <Divider />
              <InlineStack
                wrap={false}
                blockAlign="center"
                gap="200"
                align="end"
              >
                <Button
                  onClick={
                    typeof onClosePopup === "function"
                      ? onClosePopup
                      : () => {
                          setVisible(false);
                        }
                  }
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveFooter} variant="primary">
                  Save
                </Button>
              </InlineStack>
            </>
          )}
        </BlockStack>
      </Box>
    </Popover>
  );
};

export default EditorColorPicker;
