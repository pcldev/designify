import React from "react";
import { useStore } from "~/.client/libs/external-store";
import ImageSource from "./inspector/ImageSource";

export const image_placeholder =
  "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/image-icon.svg?v=1730389821";

function Image(props) {
  const state = useStore(props.store, (state) => state);

  const { data } = state;
  return <img style={{ width: "100%" }} src={data?.src || image_placeholder} />;
}

export default Image;

export const ImageGeneral = [ImageSource];

export const ImageStyling = [];
