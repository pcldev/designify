import type { ConnectionArguments } from '../types'
import { ITEM_LIST_LIMITATION } from '~/constants'
import { getConnectionArguments } from '../fns.server'
import { PAGE_INFO_SELECTION } from '../constants.server'
import { PRODUCT_LIST_FIELD_SELECTION, PRODUCT_VARIANTS_LIST_FIELD_SELECTION } from './constants.server'

/**
 * Generate a GraphQL query for retrieving a list of Shopify products.
 *
 * @see https://shopify.dev/docs/api/admin-graphql/2024-10/queries/products
 *
 * @param {object} params An object that specifies ProductConnection arguments
 *
 * @returns {string}
 */
export function queryForProducts(params: ConnectionArguments = {}): string {
  return `
    query {
      products(${getConnectionArguments(params).join(', ')}) {
        ${PRODUCT_LIST_FIELD_SELECTION}
        ${PAGE_INFO_SELECTION}
      }
    }`
}

export const queryForProductMedia = `
  query getProductMedia($productId: ID!) {
    product(id: $productId) {
      variants(first: 50) {
        edges {
          node {
            id
            media(first: 50) {
              edges {
                node {
                  ... on MediaImage {
                    id
                    alt
                    mediaContentType
                    image {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
      media(first: ${ITEM_LIST_LIMITATION}) {
        edges {
          node {
            ... on MediaImage {
              id
              alt
              mediaContentType
              image {
                originalSrc
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }`

export const queryForProductVariants = (params: ConnectionArguments = {}): string => {
  return `
    query {
      productVariants(${getConnectionArguments(params).join(', ')}) {
        ${PRODUCT_VARIANTS_LIST_FIELD_SELECTION}
        ${PAGE_INFO_SELECTION}
      }
    }
  `
}
