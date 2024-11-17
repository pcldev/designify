import { memo } from "react";
import getFilenameAndTypeFromShopifyCDN from "../utilities/getFilenameAndTypeFromShopifyCDN";
import { BlockStack, Box, Text } from "@shopify/polaris";
import { ThumbnailButton } from "./ThumbnailButton";
import React from "react";

type IImageQuery = any;

export const MediaItem = memo(function MediaItem(props: {
  media: IImageQuery;
  selected?: boolean;
  setImageSelected: (newCheck: boolean, image: IImageQuery) => void;
}) {
  const { media, selected, setImageSelected } = props;
  const { filename, type } = getFilenameAndTypeFromShopifyCDN(
    media.image.originalSrc,
  );

  return (
    <div className="ds-thumnail-wrapper">
      <BlockStack
        align="center"
        inlineAlign="center"
        gap={"100"}
        key={media.id}
      >
        <ThumbnailButton
          selected={selected}
          media={media}
          setImageSelected={setImageSelected}
        />

        <BlockStack inlineAlign="center" align="center">
          <MediaTitle media={media} filename={filename} />
          <MediaType media={media} type={type} />
        </BlockStack>
      </BlockStack>
    </div>
  );
});

function MediaTitle(props: {
  media: IImageQuery & { isUploading?: boolean };
  filename: string;
}) {
  const { media, filename } = props;
  return (
    <Box width="100px">
      <Text as="p" variant="bodySm" truncate alignment="center">
        {media.isUploading ? media.alt : filename}
      </Text>
    </Box>
  );
}

function MediaType(props: {
  media: IImageQuery & { isUploading?: boolean; type?: string };
  type: string;
}) {
  const { media, type } = props;
  return (
    <Text as="p" variant="bodySm" truncate>
      {media.isUploading ? media.type : type.toUpperCase()}
    </Text>
  );
}
