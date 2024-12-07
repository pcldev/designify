import { useStore } from "~/.client/libs/external-store";
import VideoSource from "./inspector/VideoSource";
import VideoWidthInspector from "./inspector/VideoWidth";
import VideoHeightInspector from "./inspector/VideoHeight";
import SpacingInspector from "~/.client/modules/editor/components/Inspector/Styling/Spacing";

const video_placeholder =
  "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/video-icon.svg?v=1730389822";

function Video(props: { mode: string; data: any; store: any }) {
  const { mode, store } = props;

  const state = useStore(store, (state) => state);

  const { data } = state;

  const renderIframe = () =>
    !data?.src ? (
      <img src={video_placeholder} alt="Video placeholder" />
    ) : (
      <div style={{ width: "100%" }}>
        <iframe
          width={"100%"}
          height={"100%"}
          src={data.src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            ...(mode === "edit" ? { pointerEvents: "none" } : {}),
          }}
        />
      </div>
    );

  return renderIframe();
}

export default Video;

export const VideoGeneral = [
  VideoWidthInspector,
  VideoHeightInspector,
  VideoSource,
];

export const VideoStyling = [SpacingInspector];
