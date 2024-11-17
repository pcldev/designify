import React from "react";
import { useStore } from "~/.client/libs/external-store";
import VideoSource from "./inspector/VideoSource";

const video_placeholder =
  "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/video-icon.svg?v=1730389822";

function Video(props) {
  const state = useStore(props.store, (state) => state);

  const { data } = state;

  return !data?.src ? (
    <img src={video_placeholder} alt="Video placeholder" />
  ) : (
    <video
      width={"100%"}
      src={data.src}
      controlsList="nodownload"
      disablePictureInPicture
    ></video>
  );
}

export default Video;

export const VideoGeneral = [VideoSource];

export const VideoStyling = [];
