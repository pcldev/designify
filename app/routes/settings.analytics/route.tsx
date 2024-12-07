import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlockStack, Box, Text, useBreakpoints } from "@shopify/polaris";
import AppConfig from "~/models/AppConfig.server";
import { authenticate } from "~/shopify.server";
import GoogleTagIdComponent from "./components/GoogleTagIdComponent";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const {
    session: { shop: shopDomain },
  } = await authenticate.admin(request);

  const appConfig = await AppConfig.aggregate([
    {
      $match: {
        shopDomain,
      },
    },
    {
      $project: {
        ga4Code: 1,
      },
    },
  ]);

  return appConfig[0].ga4Code;
};

function Index() {
  const { mdDown } = useBreakpoints();

  const ga4Code = useLoaderData();

  return (
    <BlockStack>
      <Box
        paddingBlock={mdDown ? "400" : "600"}
        paddingInlineStart={mdDown ? "400" : "0"}
      >
        <Text as="h2" variant="headingLg">
          {"Analytics"}
        </Text>
      </Box>
      <BlockStack gap={"400"}>
        <GoogleTagIdComponent ga4Code={ga4Code} />
      </BlockStack>
    </BlockStack>
  );
}

export default Index;
