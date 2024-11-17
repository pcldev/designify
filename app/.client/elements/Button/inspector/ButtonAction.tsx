import React, { useCallback, useState } from "react";
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

const buttonActions: ActionListItemDescriptor[] = [
  { content: "--", id: "" },
  { content: "Go to url", id: "url" },
];

function ButtonActionInspector(props) {
  const { elementStore } = props;

  const clickAction = useStore(elementStore, (state) => state.data.clickAction);
  const url = useStore(elementStore, (state) => state.data.url) || "";

  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const onChangeClickActionHandler = useCallback((clickAction: string) => {
    // Set button action
    elementStore.dispatch({
      type: "UPDATE_DATA",
      payload: {
        data: {
          clickAction,
        },
      },
    });

    // Close popover
    togglePopoverActive();
  }, []);

  const onChangeURLHandler = useCallback((url: string) => {
    // Set url
    elementStore.dispatch({
      type: "UPDATE_DATA",
      payload: {
        data: {
          url,
        },
      },
    });
  }, []);

  const activator = (
    <Button
      onClick={togglePopoverActive}
      disclosure="select"
      fullWidth
      textAlign="left"
    >
      {buttonActions.find((buttonAction) => buttonAction.id === clickAction)
        ?.content || "--"}
    </Button>
  );

  return (
    <AccordionList
      items={[
        {
          open: true,
          label: "Action",
          id: "action",
          content: (
            <Box paddingBlockStart={"400"}>
              <BlockStack gap={"100"}>
                <Text as="p" variant="bodyMd">
                  Click action
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
                    items={buttonActions.map((buttonAction) => ({
                      ...buttonAction,
                      onAction: () => {
                        onChangeClickActionHandler(buttonAction.id!);
                      },
                    }))}
                  />
                </Popover>

                {clickAction === "url" && (
                  <TextField
                    autoComplete="off"
                    label="URL"
                    placeholder="https://designify-page-builder.vercel.com"
                    value={url}
                    onChange={onChangeURLHandler}
                  />
                )}
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default ButtonActionInspector;
