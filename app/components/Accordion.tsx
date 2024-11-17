import { useCallback, useState, type ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@shopify/polaris-icons";
import { Box, Collapsible, Icon, InlineStack, Text } from "@shopify/polaris";
import type { ColorBorderAlias } from "@shopify/polaris-tokens";

export type AccordionProps = {
  id: string;
  label: string;
  open: boolean;
  content: ReactNode;
  borderColor?: ColorBorderAlias | "transparent";
};

export type AccordionListProps = {
  items: [AccordionProps];
};

export function Accordion(props: AccordionProps) {
  const { id, open, label, content, borderColor = "border" } = props;

  const [collapsed, setCollapsed] = useState<boolean>(!open);

  const toggleAccordion = useCallback(
    () => setCollapsed(!collapsed),
    [collapsed],
  );

  return (
    <Box borderBlockEndWidth="025" borderColor={borderColor}>
      <div className="ds-collapsible">
        <Box
          paddingBlock={"300"}
          paddingInline={"400"}
          borderBlockEndWidth="025"
          borderColor={borderColor}
        >
          <div
            onClick={toggleAccordion}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <InlineStack blockAlign="center" align="space-between">
              <Text variant="bodyMd" fontWeight="semibold" as="p">
                {label}
              </Text>
              <div>
                {collapsed ? (
                  <Icon source={ChevronDownIcon} tone="base" />
                ) : (
                  <Icon source={ChevronUpIcon} tone="base" />
                )}
              </div>
            </InlineStack>
          </div>
        </Box>
      </div>

      <Box paddingInline={"400"}>
        <Collapsible
          id={id}
          expandOnPrint
          open={!collapsed}
          transition={{ duration: "250ms", timingFunction: "ease-in-out" }}
        >
          <Box paddingBlockEnd={"400"}>{content}</Box>
        </Collapsible>
      </Box>
    </Box>
  );
}

export function AccordionList(props: AccordionListProps) {
  return props.items?.map((item) => <Accordion key={item.id} {...item} />);
}
