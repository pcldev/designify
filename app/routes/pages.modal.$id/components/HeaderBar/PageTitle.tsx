import { Icon, InlineStack, Link, Text } from "@shopify/polaris";
import { ProductIcon } from "@shopify/polaris-icons";
import { useState } from "react";
import TextFieldPopover from "~/components/TextFieldPopover";
import { MAX_PAGE_TITLE_SIZE } from "~/constants/page";

export default function PageTitle() {
  const [title, setTitle] = useState("Untitled");

  function setName(value: string) {
    // Validate title length
    if (value.length > MAX_PAGE_TITLE_SIZE) {
      value = value.substring(0, 60);
    }

    setTitle(value);
  }

  const activator = (
    <InlineStack gap={"100"}>
      <Icon source={ProductIcon} tone="base" />

      <Link monochrome removeUnderline>
        <Text as="h2" variant="bodyMd" truncate>
          {title}
        </Text>
      </Link>
    </InlineStack>
  );

  return (
    <TextFieldPopover
      value={title}
      setValue={setName}
      activator={activator}
      label={"Page title"}
      maxLength={MAX_PAGE_TITLE_SIZE}
    />
  );
}
