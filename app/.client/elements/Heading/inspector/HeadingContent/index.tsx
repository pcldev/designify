import { useCallback, useState } from "react";

import {
  ActionList,
  ActionListItemDescriptor,
  BlockStack,
  Box,
  Button,
  Popover,
  Text,
  TextField,
} from "@shopify/polaris";
import { useStore } from "~/.client/libs/external-store";
import { AccordionList } from "~/components/Accordion";

const headings: ActionListItemDescriptor[] = [
  { content: "H1", id: "h1" },
  { content: "H2", id: "h2" },
  { content: "H3", id: "h3" },
  { content: "H4", id: "h4" },
  { content: "H5", id: "h5" },
  { content: "H6", id: "h6" },
];

function HeadingContentInspector(props) {
  const { elementStore } = props;

  const content = useStore(elementStore, (state) => state.data.content);
  const tag = useStore(elementStore, (state) => state.data.tag);

  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const onChangeHeadingTextHandler = useCallback((content: string) => {
    // Set heading content
    elementStore.dispatch({
      type: "UPDATE_DATA",
      payload: {
        data: {
          content,
        },
      },
    });
  }, []);

  const onChangeHeadingTagHandler = useCallback((tag: string) => {
    // Set heading tag
    elementStore.dispatch({
      type: "UPDATE_DATA",
      payload: {
        data: {
          tag,
        },
      },
    });

    // Close popover
    togglePopoverActive();
  }, []);

  const activator = (
    <Button
      onClick={togglePopoverActive}
      disclosure="select"
      fullWidth
      textAlign="left"
    >
      {headings.find((heading) => heading.id === tag)?.content}
    </Button>
  );

  return (
    <AccordionList
      items={[
        {
          open: true,
          label: "Content",
          id: "content",
          content: (
            <Box paddingBlockStart={"400"}>
              <BlockStack gap={"200"}>
                <TextField
                  autoComplete="off"
                  label="Heading content"
                  value={content}
                  onChange={onChangeHeadingTextHandler}
                />

                <BlockStack gap={"100"}>
                  <Text as="p" variant="bodyMd">
                    HTML tag
                  </Text>
                  <Popover
                    fullWidth
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                  >
                    <ActionList
                      actionRole="menuitem"
                      items={headings.map((heading) => ({
                        ...heading,
                        onAction: () => {
                          onChangeHeadingTagHandler(heading.id!);
                        },
                      }))}
                    />
                  </Popover>
                </BlockStack>
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default HeadingContentInspector;
