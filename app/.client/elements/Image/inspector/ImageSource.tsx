import { BlockStack, Box, Button, Image, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { AccordionList } from "~/components/Accordion";

import ImageSelector from "~/.client/components/ImageSelector";
import { useStore } from "~/.client/libs/external-store";

function ImageSource(props) {
  const elementStore = props.elementStore;

  const src = useStore(elementStore, (state) => state.data.src);

  const [imageModalActive, setImageModalActive] = useState(false);

  const onClose = useCallback(() => {
    setImageModalActive(false);
  }, []);

  const toggleImageSelectModal = useCallback(() => {
    setImageModalActive((pre) => !pre);
  }, []);

  const onSelectImageHandler = useCallback((media: any) => {
    console.log("src: ", src);
    // Set source
    elementStore.dispatch({
      type: "UPDATE_DATA",
      payload: {
        data: {
          src: media[0].image.originalSrc,
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
                <Text as="p" variant="bodyMd">
                  Image source
                </Text>

                {!src ? (
                  <Button onClick={() => toggleImageSelectModal()}>
                    Select source
                  </Button>
                ) : (
                  <div
                    onClick={() => toggleImageSelectModal()}
                    style={{
                      width: "100%",
                      border: "1px dashed black",
                      padding: "4px",
                      borderRadius: "4px",

                      cursor: "pointer",
                    }}
                  >
                    <Image
                      source={src}
                      alt=""
                      width={"100%"}
                      height={"200px"}
                      style={{
                        display: "block",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <ImageSelector
                  active={imageModalActive}
                  onSelectImage={onSelectImageHandler}
                  onClose={onClose}
                />
              </BlockStack>
            </Box>
          ),
        },
      ]}
    />
  );
}

export default ImageSource;
