import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { fetchList } from "~/bootstrap/fns/fetch.server";
import { getPageByID, ShopifyPage } from "~/models/ShopifyPage.server";
import { authenticate } from "~/shopify.server";
import { EActionType } from "~/constants/fetcher-keys";
import { updateElement } from "~/models/Element.server";
import { uuid } from "~/utils/uuid";
import { updateStyle } from "~/models/Style.server";
import { upsertShopifyPageConfig } from "~/models/ShopifyPageConfig.server";
import { catchAsync } from "~/utils/catchAsync";

export const loader = catchAsync(async ({ request }: LoaderFunctionArgs) => {
  // Get templates with population of pageConfig
  const { page, items, total } = await fetchList(request, ShopifyPage, [
    {
      $lookup: {
        from: "pageconfigs", // Ensure this matches the name of your PageConfig collection
        localField: "pageConfig", // The field in the page schema that references PageConfig
        foreignField: "_id", // The _id field in the PageConfig collection
        as: "pageConfigDetails", // The alias to hold the populated result
      },
    },
    {
      $unwind: { path: "$pageConfigDetails", preserveNullAndEmptyArrays: true }, // Unwind to directly access the fields from PageConfig
    },
    {
      $addFields: {
        status: {
          $cond: {
            if: { $ne: ["$pageConfigDetails.publishedAt", null] },
            then: "published",
            else: "unpublished",
          },
        },
        publishedAt: "$pageConfigDetails.publishedAt", // Add the populated 'publishedAt' to the result
      },
    },
    {
      $project: {
        title: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        previewUrl: 1,
        shopDomain: 1,
        type: 1,
        publishedAt: 1, // Include the 'publishedAt' field in the final projection
      },
    },
  ]);

  return json({ page, items, total });
});

export const action = catchAsync(async ({ request }: LoaderFunctionArgs) => {
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

      case EActionType.DUPLICATE_PAGES: {
        // Get shopify image list
        const pages = payload.pages;

        // Duplicate pages
        for (const pageId of pages) {
          const page = await getPageByID(pageId);
          const { elements, styles, pageConfig, ...otherPageProps } = page;
          const newPageId = uuid();

          // Duplicate page config
          await upsertShopifyPageConfig({ ...pageConfig, _id: newPageId });

          // Step 1: Create a mapping of old IDs to new IDs
          const idMap = elements.reduce((map, el) => {
            map[el._id] = uuid();
            return map;
          }, {});

          // Duplicate elements
          const newElementIds = await Promise.all(
            elements.map(async (element: any) => {
              const newElementId = idMap[element._id];

              const elementStyle = styles.find(
                (style: any) => style._id === element._id,
              );

              // Duplicate styles
              await updateStyle({ ...elementStyle, _id: newElementId });

              // Duplicate elements
              await updateElement({
                ...element,
                children: element.children.map(
                  (childId: string) => idMap[childId],
                ),
                _id: newElementId, // Replace _id with new id
              });

              return newElementId;
            }),
          );

          await ShopifyPage.findOneAndUpdate(
            {
              _id: newPageId,
            },
            {
              ...otherPageProps,

              _id: newPageId,
              title: `${page.title} Copy`,
              elements: newElementIds,
              styles: newElementIds,
            },
            { upsert: true },
          );
        }

        return json({ success: true });
      }
    }
  } catch (e: any) {
    return json({ success: false, message: e?.message || e });
  }
});
