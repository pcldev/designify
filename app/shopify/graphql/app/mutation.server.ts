import { USER_ERROR_SELECTION } from '../constants.server'

export const mutationCreateAppDataMetafield = `
  mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafieldsSetInput) {
      metafields {
        id
        key
        value
        namespace
      }
      ${USER_ERROR_SELECTION}
    }
  }`

export const mutationMetafieldDelete = `
  mutation metafieldDelete($input: MetafieldDeleteInput!) {
    metafieldDelete(input: $input) {
      deletedId
      ${USER_ERROR_SELECTION}
    }
  }`
