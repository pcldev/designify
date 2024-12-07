import type { LoaderFunctionArgs } from "@remix-run/node";
import AppConfig from "~/models/AppConfig.server";
import { authenticate } from "~/shopify.server";
import GeneralAccount from "./components/GeneralAccount";
import { useRootLoaderData } from "~/root";
import { BlockStack, Box, useBreakpoints, Text } from "@shopify/polaris";

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
  const { shopData } = useRootLoaderData();

  const { mdDown } = useBreakpoints();

  return (
    <BlockStack>
      <Box
        paddingBlock={mdDown ? "400" : "600"}
        paddingInlineStart={mdDown ? "400" : "0"}
      >
        <Text as="h2" variant="headingLg">
          {"Account"}
        </Text>
      </Box>
      <BlockStack gap={"400"}>
        <GeneralAccount shop={shopData} />;
      </BlockStack>
    </BlockStack>
  );
}

export default Index;
