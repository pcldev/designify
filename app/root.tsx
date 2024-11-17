import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "./shopify.server";
import { publicPages } from "./bootstrap/app-config";
import Shop from "./models/Shop.server";
import { RemixQueryClientProvider } from "./libs/remix-query/context-provider";
import BlockLoading from "./components/Loading";
import { useMemo } from "react";
import { RemixQueryClient } from "./libs/remix-query/query-client";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  let shopDomain: string = "";
  if (!publicPages.includes(url.pathname)) {
    const {
      session: { shop: _shop },
    } = await authenticate.admin(request);

    shopDomain = _shop;
  }

  let shopData = null;
  if (shopDomain) {
    shopData = await Shop.findOne({ shopDomain });
  }

  const { SHOPIFY_API_KEY } = process.env;

  return json({
    params,
    apiKey: SHOPIFY_API_KEY,
    shopData,
  });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isLoadingPage = navigation.state !== "idle";

  const remixQueryClient = useMemo(() => new RemixQueryClient(), []);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider isEmbeddedApp apiKey={apiKey as string}>
          <div style={{ display: isLoadingPage ? "none" : undefined }}>
            <RemixQueryClientProvider.Provider value={{ remixQueryClient }}>
              <Outlet />
            </RemixQueryClientProvider.Provider>
            <ScrollRestoration />
            <Scripts />
          </div>
          {isLoadingPage && <BlockLoading />}
        </AppProvider>
      </body>
    </html>
  );
}
