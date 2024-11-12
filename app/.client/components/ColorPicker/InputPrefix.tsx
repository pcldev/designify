import type { CSSProperties } from "react";
import React from "react";

export interface InputColorInterface {
  value: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  customBorderRadius?: string;
}
const urlPlaceholder =
  "https://apps.pagefly.io/assets/pagefly/static/checker.446aab4f.gif";

const InputPrefix: React.FC<InputColorInterface> = ({
  value,
  visible,
  setVisible,
  customBorderRadius,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${urlPlaceholder})`,
        borderRadius: customBorderRadius || "50%",
        width: "16px",
        height: "16px",
        boxShadow: "inset 0 0 0 1px rgba(162, 162, 162, 0.2)",
        marginRight: "6px",
      }}
      onClick={() => setVisible(!visible)}
      className={"cl-v is-link"}
    >
      <StyledPrefix
        style={{ borderRadius: customBorderRadius || "50%" }}
        backgroundColor={value || "rgba(0,0,0,0)"}
      />
    </div>
  );
};

export default InputPrefix;

const StyledPrefix = (props: {
  style: CSSProperties;
  backgroundColor: string;
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: props.backgroundColor,
        ...props.style,
      }}
    ></div>
  );
};
