/**
 * @description: Publishes a resource to current channel
 * @example
 * {
        "id": "gid://shopify/Product/921728736"
    }
 */
export const publishablePublishMutation = `#graphql
    mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
            publishable {
                availablePublicationsCount {
                    count
                }
                resourcePublicationsCount {
                    count
                }
            }
            shop {
                publicationCount
            }
            userErrors {
                field
                message
            }
        }
    }
`
