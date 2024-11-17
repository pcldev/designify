import { Box, Text } from "@shopify/polaris";
import { elementGenerals } from "~/.client/elements";

function GeneralInspector(props) {
  const elementStore = props.elementStore;

  const elementGeneralSetting = elementGenerals[elementStore.getState().type];

  return (
    <Box>
      {elementGeneralSetting ? (
        elementGeneralSetting.map((Component, index) => (
          <Component elementStore={elementStore} key={index} />
        ))
      ) : (
        <Text as="p">This part is not implemented yet</Text>
      )}
    </Box>
  );
}

export default GeneralInspector;
