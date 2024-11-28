import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { PAGE_ACTIONS } from "./constants";
import { getPageByID, upsertPage } from "~/models/ShopifyPage.server";
import { ShopifyApiClient } from "~/shopify/graphql/api.server";
import ShopifyPageConfig from "~/models/ShopifyPageConfig.server";

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const {
      session: { shop: shopDomain },
      admin,
    } = await authenticate.admin(request);

    // Get action from search params

    const payload = await request.json();

    const action = payload.action;

    switch (action) {
      case PAGE_ACTIONS["save-page"]: {
        // Get shopify image list
        const pageData = payload.pageData;

        const page = await upsertPage({ ...pageData, shopDomain });

        return json({ success: true, page });
      }

      case PAGE_ACTIONS["publish-page"]: {
        const api = new ShopifyApiClient(admin);

        const pageId = payload._id;

        const page = await getPageByID(pageId);

        const { html, css, title, pageConfig } = page;

        try {
          if (pageConfig.shopifyPageId) {
            // Update page
            const pageMutation = await api.updatePage(
              pageConfig.shopifyPageId,
              {
                title,
                body: `<style>${css}</style>${html}`,
                isPublished: true,
              },
            );

            return json({ success: true, pageMutation });
          } else {
            const pageMutation = await api.createPage({
              title,
              body: `<style>${css}</style>${html}`,
              isPublished: true,
              templateSuffix: `ds-${pageId.split("-")[0]}`,
            });

            const {
              page: { handle, id: shopifyPageId },
            } = pageMutation;

            // Update PageConfig
            await ShopifyPageConfig.updateOne(
              { _id: pageId },
              { handle, shopifyPageId, publishedAt: new Date() },
            );

            return json({ success: true, pageMutation });
          }
        } catch (e) {
          return json({ success: false, message: e });
        }

        // return json({ success: true, pageMutation });
      }
    }
  } catch (e: any) {
    return json({ success: false, message: e?.message || e });
  }
};
