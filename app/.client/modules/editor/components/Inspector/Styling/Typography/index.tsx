import { useElementStyle } from "~/.client/stores/element-store";
import { IStylingInspectorProps } from "..";
import ColorInspector from "./Color";
import { AccordionList } from "~/components/Accordion";
import { Box } from "@shopify/polaris";

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
                <ColorInspector {...props} />
              </Box>
            ),
          },
        ]}
      />
    </div>
  );
}

export default TypographyStyling;
