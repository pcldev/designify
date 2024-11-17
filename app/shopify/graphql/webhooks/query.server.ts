/**
 * @description Returns a list of webhook subscriptions.
 * @see https://shopify.dev/docs/api/admin-graphql/2024-10/queries/webhookSubscriptions
 */

export const queryForWebhooks = `{
    webhookSubscriptions(first: 50) {
        edges {
        node {
                id
                topic
            }
        }
    }
}
`
