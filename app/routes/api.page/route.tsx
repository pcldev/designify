import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { ShopifyApiClient } from "~/shopify/graphql/api.server";
import { authenticate } from "~/shopify.server";
import { PAGE_ACTIONS } from "./constants";
import { upsertPage } from "~/models/Page.server";

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const {
      admin,
      session: { shop: shopDomain },
    } = await authenticate.admin(request);
    const api = new ShopifyApiClient(admin);

    // Get action from search params

    const payload = await request.json();

    const action = payload.action;

    switch (action) {
      case PAGE_ACTIONS["save-page"]: {
        // Get shopify image list
        const pageData = payload.pageData;

        const page = await upsertPage(pageData);

        return json({ success: true, page });
      }
    }
  } catch (e: any) {
    return json({ success: false, message: e?.message || e });
  }
};
