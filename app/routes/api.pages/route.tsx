import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { fetchList } from "~/bootstrap/fns/fetch.server";
import { ShopifyPage } from "~/models/ShopifyPage.server";
import { authenticate } from "~/shopify.server";
import { EActionType } from "~/constants/fetcher-keys";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get templates
  const { page, items, total } = await fetchList(request, ShopifyPage, [
    {
      $addFields: {
        status: {
          $cond: {
            if: { $ne: ["$publishedAt", null] },
            then: "published",
            else: "unpublished",
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        status: 1,
        publishedAt: 1,
        createdAt: 1,
        updatedAt: 1,
        previewUrl: 1,
        shopDomain: 1,
        type: 1,
      },
    },
  ]);

  return json({ page, items, total });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const {
      session: { shop: shopDomain },
    } = await authenticate.admin(request);

    // Get action from search params

    const payload = await request.json();

    const action = payload.action;

    switch (action) {
      case EActionType.DELETE_PAGES: {
        // Get shopify image list
        const pages = payload.pages;

        await ShopifyPage.deleteMany({ _id: { $in: pages }, shopDomain });

        return json({ success: true });
      }
    }
  } catch (e: any) {
    return json({ success: false, message: e?.message || e });
  }
};
