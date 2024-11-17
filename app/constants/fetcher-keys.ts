export enum EFetcherKeys {
  ALL_SHOPIFY_PRODUCTS = 'all-shopify-products',
  UPLOAD_IMAGE_OPTION = 'upload-image-option',
  ALL_SHOPIFY_VARIANTS = 'all-shopify-variants',
  SEARCH_SHOPIFY_VARIANTS = 'search-shopify-variants',
}

export enum EQueryProducts {
  ENABLE_FETCH_VARIANTS = 'enable-fetch-variants',
  SEARCH_VARIANTS = 'search-variants',
  ENABLE_FETCH_VARIANTS_BY_PRODUCT_IDS = 'enable-fetch-variants-by-product-ids',
  SEARCH_VARIANTS_BY_PRODUCT_IDS = 'search-variants-by-product-ids',
}

export enum EActionType {
  'DISCARD_INTEGRATION' = 'discard-integration',
  'SAVE_INTEGRATION' = 'save-integration',
  'PUBLISH_INTEGRATION' = 'publish-integration',
  'UNPUBLISH_INTEGRATION' = 'unpublish-integration',
  'SAVED_INTEGRATION' = 'saved-integration',
  'PUBLISHED_INTEGRATION' = 'published-integration',
  'UNPUBLISHED_INTEGRATION' = 'unpublished-integration',
  'GET_PRODUCT_MEDIAS' = 'get-product-medias',
  'GET_AREA_BY_ID' = 'get-area-by-id',
  'GET_PRINT_AREA_BY_SHOP_DOMAIN' = 'get-print-area-by-shop-domain',
  'GET_PRINT_AREA_BY_ID' = 'get-print-area-by-id',
}

export enum EQueryMediaList {
  ENABLE_FETCH_MEDIA_LIST = 'enable-fetch-media-list',
  SEARCH_MEDIA = 'search-media',
}
