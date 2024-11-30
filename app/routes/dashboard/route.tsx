import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlockStack, Page } from "@shopify/polaris";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import { authenticatedFetch } from "~/shopify/fns.client";
import News from "./components/News";
import RecentPages from "./components/RecentPages";
import { HydrateFallback } from "../pages.modal.$id/route";

export const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  const pages = await authenticatedFetch("/api/pages?limit=5");

  return pages;
};

export { HydrateFallback };

export default withNavMenu(function Index(props: any) {
  const pages = useLoaderData();

  return (
    <Page>
      <ui-title-bar title={"Dashboard"} />

      <BlockStack gap={"600"}>
        <RecentPages pages={pages} />
        <News />
      </BlockStack>
    </Page>
  );
});
