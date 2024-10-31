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

function ElementsCatalog() {
  const elementGroups = useMemo(() => groupedCatalogData.Elements, []);

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
                        <div className="element-catalog" key={index}>
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
