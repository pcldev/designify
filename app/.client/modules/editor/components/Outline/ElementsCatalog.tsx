import {
  BlockStack,
  Box,
  Icon,
  Image,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { useMemo } from "react";
import { groupedCatalogData } from "~/.client/constants/catalog";
import { AccordionList } from "~/components/Accordion";
import { globalDragData } from "../dnd-editor";

function ElementsCatalog() {
  const elementGroups = useMemo(() => groupedCatalogData.Elements, []);

  const handleDragStart = (el: any, index: number) => {
    const dragItem = el.items.find((item) => item._id === 0);
    globalDragData.catalogData = el;
    globalDragData.elementData = dragItem;
  };

  return (
    <Box>
      {Object.keys(elementGroups).map((group, index) => (
        <AccordionList
          key={index}
          items={[
            {
              open: true,
              label: group,
              id: group,
              content: (
                <InlineStack gap={"300"}>
                  {Object.keys(elementGroups[group] as any[]).map(
                    (elementGroup) => {
                      const elements = elementGroups[group][
                        elementGroup
                      ] as any[];

                      return elements.map((element, index) => (
                        <div
                          className="element-catalog"
                          key={index}
                          draggable
                          onDragStart={() => handleDragStart(element, index)}
                        >
                          <Box padding={"200"}>
                            <BlockStack
                              gap={"200"}
                              align="center"
                              inlineAlign="center"
                            >
                              <Image
                                source={element.icon}
                                alt={element.name}
                                width={"100%"}
                                height={"100%"}
                              />
                              <Text as="h3" variant="bodyMd">
                                {element.name}
                              </Text>
                            </BlockStack>
                          </Box>
                        </div>
                      ));
                    },
                  )}
                </InlineStack>
              ),
            },
          ]}
        />
      ))}
    </Box>
  );
}

export default ElementsCatalog;
