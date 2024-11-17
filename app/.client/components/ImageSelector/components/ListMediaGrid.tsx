import { BlockStack, Box, InlineGrid } from "@shopify/polaris";

import { MediaItem } from "./MediaItem";
import { useCallback, useMemo } from "react";
import React from "react";

type IImageQuery = any;

function ListMediaGrid({
  files,
  isLoading,
  imagesSelected = [],
  setImagesSelected,
  allowMultiple,
}: {
  files: IImageQuery[];
  isLoading: boolean;
  imagesSelected?: IImageQuery[] | null;
  setImagesSelected: (image: IImageQuery[]) => void;
  allowMultiple?: boolean;
}) {
  const mediaFiles = useMemo(
    () => (files?.length ? files.filter((file) => !!file) : []),
    [files],
  );

  const onSelectImageHandler = useCallback(
    (newCheck: boolean, media: IImageQuery) => {
      if (newCheck) {
        const newImages = allowMultiple
          ? [...(imagesSelected || []), media]
          : [media];

        setImagesSelected(newImages);
      } else {
        const filteredImages = imagesSelected?.filter(
          (selectedImage) =>
            selectedImage.image.originalSrc !== media.image.originalSrc,
        );

        const newImages = filteredImages || [];

        setImagesSelected(newImages);
      }
    },
    [allowMultiple, imagesSelected, setImagesSelected],
  );

  return (
    <InlineGrid
      columns={{ xs: 2, sm: 4, md: 5, lg: 5, xl: 5 }}
      alignItems="start"
    >
      {mediaFiles.map((media: IImageQuery) => {
        return (
          <MediaItem
            key={media.id}
            selected={
              !!imagesSelected?.find(
                (selectedMedia) =>
                  selectedMedia.image.originalSrc === media.image.originalSrc,
              )
            }
            media={media}
            setImageSelected={onSelectImageHandler}
          />
        );
      })}

      {isLoading ? <ListMediaSkeleton /> : null}
    </InlineGrid>
  );
}

function ListMediaSkeleton() {
  return (
    <>
      {Array(20)
        .fill(null)
        .map((_, index) => {
          return (
            <Box key={index} padding={"300"}>
              <BlockStack align="center" inlineAlign="center" gap={"100"}>
                <Box
                  width="100px"
                  minHeight="100px"
                  background="bg-surface-brand-active"
                  borderRadius="200"
                ></Box>
              </BlockStack>
            </Box>
          );
        })}
    </>
  );
}

export default ListMediaGrid;
