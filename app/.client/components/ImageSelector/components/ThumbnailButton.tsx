import { Checkbox, Spinner } from "@shopify/polaris";
import React from "react";

type IImageQuery = any;

interface IThumbnailButton {
  media: IImageQuery & { isUploading?: boolean };
  setImageSelected?: (newCheck: boolean, image: IImageQuery) => void;
  selected?: boolean;
}

export function ThumbnailButton(props: IThumbnailButton) {
  const { media, setImageSelected, selected } = props;

  return (
    <div
      onClick={(e) => {
        if (media?.isUploading) return;

        setImageSelected && setImageSelected(!selected, media);
      }}
      className="ds-image-select"
    >
      <div className="ds-wrapper-image">
        <img
          src={media.image.originalSrc}
          alt={media.alt}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            borderRadius: "4px",
          }}
        />
      </div>

      <Checkbox
        id={media.image.originalSrc}
        name="imgUrl"
        value={media.image.originalSrc}
        label={media.alt}
        labelHidden
        checked={selected}
        disabled={media?.isUploading}
        onChange={() => {}}
      />
      {media?.isUploading && (
        <div className="ds-loading-media">
          <Spinner size="small" />
        </div>
      )}
    </div>
  );
}
