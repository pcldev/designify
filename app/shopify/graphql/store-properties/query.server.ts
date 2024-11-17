/**
 * @description: Publishes a resource to a channel
 */
export const getStorePublicationsQuery = `#graphql 
    query GetStorePublications {
        publications(first: 10) {
            edges {
                node {
                    id
                    name                    
                }
            }
        }
    }
`
