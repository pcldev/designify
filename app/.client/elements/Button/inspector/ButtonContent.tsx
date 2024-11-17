import { useCallback } from "react";

import { BlockStack, Box, TextField } from "@shopify/polaris";
import { useStore } from "~/.client/libs/external-store";
import { AccordionList } from "~/components/Accordion";

function ButtonContentInspector(props) {
  const { elementStore } = props;

  const content = useStore(elementStore, (state) => state.data.content);

  const onChangeButtonContentHandler = useCallback((content: string) => {
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
                  label="Button content"
                  value={content}
                  onChange={onChangeButtonContentHandler}
                />
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default ButtonContentInspector;
