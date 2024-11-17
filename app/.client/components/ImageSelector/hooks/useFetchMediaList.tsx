import lodash from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { EQueryMediaList } from '~/constants/fetcher-keys'
import { RemixQueryClientProvider } from '~/libs/remix-query/context-provider'
import { type IPageInfo } from '~/types/shopify-product'
import { useDebounce } from '~/utils/hooks/useDebounce'
import objectToQueryString from '~/utils/objectToQueryString'
import fetchMediaList from '../utilities/fetchMediaList'
import type { IImageQuery } from '~/types/shopify-files'

const defaultPageInfo = { hasNextPage: false, endCursor: '', hasPreviousPage: false, startCursor: '' }

export const useFetchMediaList = ({
  textFieldValue,
  fetchNextPage,
  setFetchNextPage,
}: {
  textFieldValue: string | null
  fetchNextPage: boolean
  setFetchNextPage: (isLoading: boolean) => void
}) => {
  const { remixQueryClient } = useContext(RemixQueryClientProvider)
  const deferredQuery = useDebounce(textFieldValue, 500)
  const [isFetching, setIsFetching] = useState(false)

  const cachedKey = objectToQueryString({
    ...(deferredQuery ? { [EQueryMediaList.SEARCH_MEDIA]: deferredQuery } : {}),
    [EQueryMediaList.ENABLE_FETCH_MEDIA_LIST]: true,
  })

  const cachedData = remixQueryClient.getQueryData(cachedKey)
  const mediaList: IImageQuery[] = cachedData?.mediaList || []
  const pageInfoMedia: IPageInfo = cachedData?.pageInfoMedia || defaultPageInfo

  const fetchData = async () => {
    console.log('run fetchData', cachedData)
    setIsFetching(true)
    if (cachedData === undefined || fetchNextPage) {
      const mediaListFetched = await fetchMediaList({
        pageInfo: pageInfoMedia,
        isFetchNextPage: fetchNextPage,
        queryValue: deferredQuery,
      })
      const { mediaList: newMediaList, pageInfo } = mediaListFetched || { mediaList: [], pageInfo: defaultPageInfo }

      const oldCachedData = remixQueryClient.getQueryData(cachedKey)?.mediaList
      const newMediaListData = oldCachedData?.length
        ? lodash.uniqBy([...oldCachedData, ...newMediaList], 'id')
        : newMediaList

      remixQueryClient.setQueryData(cachedKey, {
        mediaList: newMediaListData,
        pageInfoMedia: pageInfo || defaultPageInfo,
      })
    }
    setIsFetching(false)
  }

  const handleFetchMoreMedia = async () => {
    const { hasNextPage } = pageInfoMedia

    if (hasNextPage && fetchNextPage) {
      await fetchData()
      setFetchNextPage(false)
    }
    setFetchNextPage(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery])

  useEffect(() => {
    if (fetchNextPage) {
      handleFetchMoreMedia()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage])

  return {
    isFetching,
    mediaList,
    deferredQuery,
  }
}
