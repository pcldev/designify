import { Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { Grid, Page } from "@shopify/polaris";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import NavigationSettings from "./components/NavigationSettings";
import BlockLoading from "~/components/Loading";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import AppConfig from "~/models/AppConfig.server";

function Index() {
  const navigation = useNavigation();

  return (
    <Page>
      <Grid gap={{ sm: "0", md: "400" }}>
        <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
          <NavigationSettings />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, lg: 8 }}>
          {navigation.state !== "idle" ? <BlockLoading /> : <Outlet />}
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export default withNavMenu(Index);
