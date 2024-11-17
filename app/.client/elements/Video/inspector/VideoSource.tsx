import React, { useCallback } from "react";

import { BlockStack, Box, TextField } from "@shopify/polaris";
import { useStore } from "~/.client/libs/external-store";
import { AccordionList } from "~/components/Accordion";

function VideoSource(props) {
  const elementStore = props.elementStore;

  const src = useStore(elementStore, (state) => state.data.src);

  const onChangeVideoSourceHandler = useCallback((src: string) => {
    // Set source
    elementStore.dispatch({
      type: "UPDATE_DATA",
      payload: {
        data: {
          src,
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
                  label="Video source"
                  placeholder="https://youtu.be/"
                  value={src}
                  onChange={onChangeVideoSourceHandler}
                />
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default VideoSource;
