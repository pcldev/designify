export const MEDIA_LIST_FIELD_SELECTION = `
    __typename
    ... on MediaImage {
        id
        alt
        fileStatus
        image {
            originalSrc
            width
            height
        }
        fileErrors {
            code
            details
            message
        }
        mediaErrors {
            code
            details
            message
        }
    }
`
