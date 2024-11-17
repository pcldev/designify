export const queryForAppId = `
  query {
    currentAppInstallation {
      id
    }
  }`

export const queryForAppInfo = `
  query {
    app {
      title
      handle
    }
  }`

export const queryForAppMetafield = `
  #graphql
  query AppInstallationMetafields($ownerId: ID!) {
    appInstallation(id: $ownerId) {
      metafields(first: 250) {
        nodes {
          id
          namespace
          key
          value
        }
        pageInfo {
          endCursor
        }
      }
    }
  }`
