import { ITEM_LIST_LIMITATION } from '~/constants'
import { IMAGE_FIELD_SELECTION } from '../constants.server'

export const PRODUCT_LIST_FIELD_SELECTION = `
  nodes {
    id
    tags
    title
    handle
    status
    vendor
    createdAt
    updatedAt
    publishedAt
    productType
    description
    onlineStoreUrl
    templateSuffix
    totalInventory
    tracksInventory
    legacyResourceId
    requiresSellingPlan
    hasOnlyDefaultVariant
    hasOutOfStockVariants
    onlineStorePreviewUrl
    totalVariants
    seo {
      title
      description
    }
    category {
      name
      fullName
    }
    mediaCount {
      count
      precision
    }
    featuredImage {
      url
      width
      height
      altText
    }
    featuredMedia {
      alt
      preview {
        image {
          url
          width
          height
          altText
        }
      }
    }
    variantsCount {
      count
      precision
    }
    priceRangeV2 {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      maxVariantCompareAtPrice {
        amount
        currencyCode
      }
      minVariantCompareAtPrice {
        amount
        currencyCode
      }
    }
    sellingPlanGroupsCount {
      count
      precision
    }
    variants(first: ${ITEM_LIST_LIMITATION}) {
      nodes {
        id
        price
        title
        displayName
        legacyResourceId
        image {
          ${IMAGE_FIELD_SELECTION}
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }`

export const PRODUCT_VARIANTS_LIST_FIELD_SELECTION = `
  nodes {
    id
    title
    product {
      id
      handle
      featuredImage {
        altText
        width
        height
        url
      }
      title
      status
      publishedAt
      hasOnlyDefaultVariant
      variants (first:${ITEM_LIST_LIMITATION}) {
        nodes {
          id
          title
          image {
            ${IMAGE_FIELD_SELECTION}
          }
        } 
      }
    }
    image {
      ${IMAGE_FIELD_SELECTION}
    }
  }
`
