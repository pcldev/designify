import { BlockStack, Box, Text, useBreakpoints } from "@shopify/polaris";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import ThemeAppExtensionEnablement from "./components/ThemeAppExtensionEnablement";
import { authenticate } from "~/shopify.server";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import AppConfig from "~/models/AppConfig.server";
import { useLoaderData } from "@remix-run/react";

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
        enabledThemeAppExtension: 1,
      },
    },
  ]);

  return appConfig[0].enabledThemeAppExtension;
};

function Index() {
  const { mdDown } = useBreakpoints();

  const enabledThemeAppExtension = useLoaderData();

  return (
    <BlockStack>
      <Box
        paddingBlock={mdDown ? "400" : "600"}
        paddingInlineStart={mdDown ? "400" : "0"}
      >
        <Text as="h2" variant="headingLg">
          {"Theme app extension"}
        </Text>
      </Box>
      <BlockStack gap={"400"}>
        <ThemeAppExtensionEnablement
          enabledThemeAppExtension={enabledThemeAppExtension}
        />
      </BlockStack>
    </BlockStack>
  );
}

export default withNavMenu(Index);
