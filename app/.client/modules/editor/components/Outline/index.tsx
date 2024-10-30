import { BlockStack, Box, Icon, Tooltip } from "@shopify/polaris";
import { IconsIcon, LayoutSectionIcon } from "@shopify/polaris-icons";

function Outline() {
  return (
    <Box padding={"200"} borderInlineEndWidth="025" borderColor="border">
      <BlockStack gap={"200"} inlineAlign="center">
        <Tooltip content={"Page content"} dismissOnMouseOut>
          <button className="Polaris-Button" onClick={() => {}}>
            <Icon source={LayoutSectionIcon} />
          </button>
        </Tooltip>
        <Tooltip content={"Elements"} dismissOnMouseOut>
          <button className="Polaris-Button" onClick={() => {}}>
            <Icon source={IconsIcon} />
          </button>
        </Tooltip>
      </BlockStack>
    </Box>
  );
}

export default Outline;
