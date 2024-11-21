import React, { useCallback, useState } from "react";
import { BlockStack, Text, Button, Image, Box } from "@shopify/polaris";
import { useElementStyle } from "~/.client/stores/element-store";
import ImageSelector from "~/.client/components/ImageSelector";
import { AccordionList } from "~/components/Accordion";

function BackgroundImageInspector(props) {
  const { elementStore } = props;
  const { style, setStyle } = useElementStyle(elementStore);

  const [imageModalActive, setImageModalActive] = useState(false);

  const onClose = useCallback(() => {
    setImageModalActive(false);
  }, []);

  const toggleImageSelectModal = useCallback(() => {
    setImageModalActive((pre) => !pre);
  }, []);

  const backgroundImage = style?.["background-image"].split('url("')[1] || "";

  const onSelectImageHandler = useCallback((media: any) => {
    setStyle({ "background-image": `url(${media[0].image.originalSrc})` });
  }, []);

  return (
    <AccordionList
      items={[
        {
          open: true,
          label: "Background",
          id: "background",
          content: (
            <Box paddingBlockStart={"400"}>
              <BlockStack gap={"200"}>
                <Text as="h4" variant="bodyMd">
                  Content color
                </Text>
                {!backgroundImage ? (
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
                      source={backgroundImage}
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

export default BackgroundImageInspector;
