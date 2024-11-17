/**
 * @variables :{
    "mediaIds": [
        "gid://shopify/MediaImage/${MEDIA_IMAGE_ID}"
    ],
    "productId": "gid://shopify/Product/${PRODUCT_ID}"
    }
 */
export const deleteMediaMutation = `#graphql
    mutation productDeleteMedia($mediaIds: [ID!]!, $productId: ID!) {
        productDeleteMedia(mediaIds: $mediaIds, productId: $productId) {
            deletedMediaIds
            deletedProductImageIds
            mediaUserErrors {
                field
                message
            }
            product {
                id
                title
                media(first: 5) {
                    nodes {
                        alt
                        mediaContentType
                        status
                    }
                }
            }
        }
    }
`

export const productStatusMutation = `#graphql
    mutation UpdateProductStatus($input: ProductInput!) {
        productUpdate(input: $input) {
            product {
                id
                status
            }
            userErrors {
                field
                message
            }
        }
    }
`

/**
 * @variables :{
    "input": {
        "product": {
            "title": "${productTitle}",
            "descriptionHtml": "${productDescription",
            "vendor": "${productVendor" (e.g., 'Printify'),
            "status": "DRAFT",
            "productOptions": [
                {
                    "name": "Size",
                    "values": [
                    { "name": "S" },
                    { "name": "M" },
                    { "name": "L" },
                    { "name": "XL" }
                    ]
                },
                {
                    "name": "Color",
                    "values": [
                    { "name": "Red" },
                    { "name": "Blue" },
                    { "name": "Green" }
                    ]
                }
            ]
        },
        "media": [
            {
                mediaContentType: "IMAGE"
                originalSource: "${productMediaUrl"
            }
        ]
    }
  }
 }
 */
export const productCreateMutation = `#graphql
mutation CreateProduct($product: ProductInput!, $media: [CreateMediaInput!]) {
  productCreate(
    input: $product
    media: $media
  ) {
    product {
      id
      title
      handle
      descriptionHtml
      options {
        id
        name
        optionValues {
          id
          name
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}

`
/**
 * @variables :{
 * {
  "productId": "${productId}",
  "variants": [
    {
      "optionValues": [
        {
          "name": "Red",
          "optionName": "Color"
        },
        {
          "name": "S",
          "optionName": "Size"
        }
      ],
      "price": 50,
      "compareAtPrice": 20,
      "inventoryItem": {
        "cost": 30
      },
      "metafields": [
        {
          "namespace": "custom",
          "key": "tailorKitPrintAreas",
          "value": "{\"printAreas\": [{\"position\": \"back\", \"width\": 500, \"height\": 1000}]}",
          "type": "json"
        }
      ]
    },
  ]
}
}
 */
export const productVariantsBulkCreateMutation = `#graphql
  mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: REMOVE_STANDALONE_VARIANT) {
    product {
      id
      options {
        id
        name
        values
        position
        optionValues {
          id
          name
          hasVariants
        }        
      }
    }
    productVariants {
      id
      title
      price
      compareAtPrice
      inventoryItem {
        unitCost {
          amount
          currencyCode
        }
      }
      selectedOptions {
        name
        value
      }
    }
    userErrors {
        field
        message
    }
  }
}
`

export const productMediaMutation = `#graphql
    mutation productUpdateMedia($media: [UpdateMediaInput!]!, $productId: ID!) {
        productUpdateMedia(media: $media, productId: $productId) {
            media {
                alt            
                previewImageSource
            }
        }
    }
`

/**
 * @variables :{
    "media": {
        "alt": "image alt",
        "mediaContentType": "IMAGE",
        "originalSource": {IMAGE_SOURCE}
    },
    "productId": "gid://shopify/Product/${PRODUCT_ID}"
    }
 */

export const productCreateMediaMutation = `#graphql
    mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
        productCreateMedia(media: $media, productId: $productId) {
            media {
                alt
                mediaContentType
                status
            }
            mediaUserErrors {
                field
                message
            }
            product {
                id
                title
            }
        }
    }
`

/**
 * @variables :{
    "id": "gid://shopify/Product/${PRODUCT_ID}",
    "moves": [

        {
        "id": "gid://shopify/MediaImage/${MEDIA_IMAGE_ID}",
        "newPosition": "{NEW_POSITION}" // start at 0
        }
    ]
    }
 */

export const productReorderMediaMutation = `#graphql
    mutation productReorderMedia($id: ID!, $moves: [MoveInput!]!) {
        productReorderMedia(id: $id, moves: $moves) {
            job {
                id
            }
        }
    }
`

/**
 * @variable {
    "media": [
        {
        "previewImageSource": "${SOURCE_UPDATE}",
        "id": "gid://shopify/MediaImage/${MEDIA_IMAGE_ID}"
        }
    ],
    "productId": "gid://shopify/Product/${PRODUCT_ID}"
    }
 */

export const productUpdateMediaMutation = `#graphql
    mutation productUpdateMedia($media: [UpdateMediaInput!]!, $productId: ID!) {
        productUpdateMedia(media: $media, productId: $productId) {
            media {
                alt
            }
        }
    }
`

/**
 * @variable {
    "input": {
            "mediaId": "gid://shopify/MediaImage/${MEDIA_ID_UPDATE}",
            "id": "gid://shopify/ProductVariant/${VARIANT_ID}"
        }
    }
 */

export const productVariantUpdateMutation = `#graphql
    mutation updateProductVariantMetafields($input: ProductVariantInput!) {
        productVariantUpdate(input: $input) {
            productVariant {
            id
            media(first: 50) {
                edges {
                    node {
                        id
                        alt
                        mediaContentType
                    }
                }
            }
            }
            userErrors {
                message
                field
            }
        }
    }
`
