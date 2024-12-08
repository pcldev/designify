import { useNavigate } from "@remix-run/react";
import { BlockStack, Box, Button, Grid, Image, Text } from "@shopify/polaris";
import { ArrowLeftIcon } from "@shopify/polaris-icons";
import React, { useCallback } from "react";
import { PAGE_TEMPLATES } from "~/components/page-templates";
import { uuid } from "~/utils/uuid";

function CreatePageDrawer(props: {
  setCreatingPageFromTemplate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setCreatingPageFromTemplate } = props;

  const navigate = useNavigate();

  const onCreatePageFromTemplate = useCallback(
    (id: string) => {
      const _id = uuid();

      const pageTemplate = id === "1" ? "" : `?template=${id}`;

      navigate(`/pages/${_id}${pageTemplate}`);
    },
    [navigate],
  );

  return (
    <BlockStack gap={"200"}>
      <Box>
        <Button
          icon={ArrowLeftIcon}
          onClick={() => {
            setCreatingPageFromTemplate(false);
          }}
        />
      </Box>
      <Box padding={"200"} borderRadius="100" background="bg-fill">
        <BlockStack gap={"500"}>
          <Box padding={"200"}>
            <Text as="h2" variant="headingLg" alignment="center">
              Choose a template for your page
            </Text>
          </Box>
          <Grid columns={{ xs: 1, md: 3, lg: 3 }} gap={{ xs: "1" }}>
            {PAGE_TEMPLATES.map((template) => (
              <Grid.Cell key={template.id}>
                <Box borderWidth="025" borderColor="border" borderRadius="100">
                  <Box borderBlockEndWidth="025" borderColor="border">
                    <div
                      style={{
                        position: "relative",
                        height: "200px",
                        overflow: "hidden",
                        borderTopRightRadius: "4px",
                        borderTopLeftRadius: "4px",
                      }}
                    >
                      <Image
                        source={template.previewUrl}
                        alt={template.title}
                        style={{
                          bottom: "calc(-100% - 100px)",
                          top: 0,
                          width: "100%",
                          height: "auto",
                          position: "absolute",
                          zIndex: 0,
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    </div>
                  </Box>
                  <Box paddingBlock={"200"} paddingInline={"400"}>
                    <BlockStack gap={"200"}>
                      <Text as="h3" variant="headingSm">
                        {template.title}
                      </Text>
                      <Button
                        onClick={() => onCreatePageFromTemplate(template.id)}
                      >
                        Select
                      </Button>
                    </BlockStack>
                  </Box>
                </Box>
              </Grid.Cell>
            ))}
          </Grid>
        </BlockStack>
      </Box>
    </BlockStack>
  );
}

export default CreatePageDrawer;
