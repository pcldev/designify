import { Box, Text } from "@shopify/polaris";
import { elementStylings } from "~/.client/elements";

export interface IStylingInspectorProps {
  elementStore: any;
}

function StylingInspector(props: IStylingInspectorProps) {
  const elementStore = props.elementStore;

  const elementStylingSetting = elementStylings[elementStore.getState().type];

  return (
    <Box>
      {elementStylingSetting ? (
        elementStylingSetting.map((Component, index) => (
          <Component elementStore={elementStore} key={index} />
        ))
      ) : (
        <Text as="p">This part is not implemented yet</Text>
      )}
    </Box>
  );
}

export default StylingInspector;
