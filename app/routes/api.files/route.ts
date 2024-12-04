import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { ShopifyApiClient } from "~/shopify/graphql/api.server";
import { FILE_ACTIONS } from "./constants";
import { authenticate } from "~/shopify.server";
import { uploadFiles } from "~/shopify/graphql/files/fns.server";
import { catchAsync } from "~/utils/catchAsync";

export const action = catchAsync(async ({ request }: LoaderFunctionArgs) => {
  try {
    const {
      admin,
      session: { shop: shopDomain },
    } = await authenticate.admin(request);
    const api = new ShopifyApiClient(admin);

    // Get action from search params
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    switch (action) {
      case FILE_ACTIONS.FETCH_MEDIA_LISTS: {
        // Get shopify image list
        const formData = await request.formData();
        const pageInfo = JSON.parse(formData.get("pageInfo") as string);
        const isFetchNextPage = Boolean(formData.get("isFetchNextPage"));
        const queryValue: string = formData.get("queryValue") as string;

        const { hasNextPage, endCursor } = pageInfo;
        const shouldFetchNextPage = isFetchNextPage && hasNextPage && endCursor;
        const queryParams = shouldFetchNextPage
          ? { after: endCursor, query: queryValue }
          : { query: queryValue };

        const mediaList = await api.getMediaFiles(queryParams);

        return json({ success: true, mediaList });
      }

      case FILE_ACTIONS.UPLOAD_MEDIA: {
        const formData: any = await request.formData();
        const files = formData.getAll("files") as File[];

        const api = new ShopifyApiClient(admin);
        const data = await uploadFiles(api, files, shopDomain);

        return json({ success: true, data });
      }
    }
  } catch (e: any) {
    return json({ success: false, message: e?.message || e });
  }
});
