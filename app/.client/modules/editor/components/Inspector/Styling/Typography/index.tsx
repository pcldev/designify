import { useElementStyle } from "~/.client/stores/element-store";
import { IStylingInspectorProps } from "..";
import ColorInspector from "./Color";
import FontSizeInspector from "./FontSize";
import TextAlignmentInspector from "./TextAlignment";
import TextStyleInspector from "./TextStyle";
import { AccordionList } from "~/components/Accordion";
import { BlockStack, Box } from "@shopify/polaris";

interface ITypographyStylingProps {}

function TypographyStyling(
  props: ITypographyStylingProps & IStylingInspectorProps,
) {
  const { elementStore } = props;

  const style = useElementStyle(elementStore);

  // const color = useStore()

  return (
    <div>
      <AccordionList
        items={[
          {
            open: true,
            label: "Typography",
            id: "typography",
            content: (
              <Box paddingBlockStart={"400"}>
                <BlockStack gap={"200"}>
                  <ColorInspector {...props} />

                  <FontSizeInspector {...props} />

                  <TextAlignmentInspector {...props} />

                  <TextStyleInspector {...props} />
                </BlockStack>
              </Box>
            ),
          },
        ]}
      />
    </div>
  );
}

export default TypographyStyling;
