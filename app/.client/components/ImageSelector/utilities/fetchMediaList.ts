import { authenticatedFetch } from "~/shopify/fns.client";

export const FILE_ACTIONS = {
  FETCH_MEDIA_LISTS: "fetchMediaLists",
};

type IPageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor?: string | null | undefined;
  startCursor?: string | null | undefined;
};

const fetchMediaList = async (params: {
  pageInfo: IPageInfo;
  isFetchNextPage?: boolean;
  queryValue?: string;
}) => {
  const { pageInfo, isFetchNextPage = false, queryValue = "" } = params;
  try {
    const formData = new FormData();
    formData.append("pageInfo", JSON.stringify(pageInfo));
    formData.append("isFetchNextPage", isFetchNextPage.toString());
    formData.append("queryValue", queryValue);

    const res = await authenticatedFetch(
      `/api/files?action=${FILE_ACTIONS.FETCH_MEDIA_LISTS}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (res && res.success) {
      return {
        mediaList: (res.mediaList?.nodes || []).filter(
          (file: any) => file?.fileErrors?.length < 1,
        ),
        pageInfo: res.mediaList?.pageInfo || {},
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchMediaList;
