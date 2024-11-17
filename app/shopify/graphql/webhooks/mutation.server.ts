/**
 * @description Deletes a webhook subscription.
 * @see https://shopify.dev/docs/api/admin-graphql/2024-10/mutations/webhookSubscriptionDelete
 */

export const deleteWebhookMutation = `
  mutation webhookSubscriptionDelete($id: ID!) {
    webhookSubscriptionDelete(id: $id) {
      deletedWebhookSubscriptionId
      userErrors {
        field
        message
      }
    }
  }
`
