import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { fetchList } from "~/bootstrap/fns/fetch.server";
import { ShopifyPage } from "~/models/ShopifyPage.server";

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
