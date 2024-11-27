export const PageCreate = `#graphql
    mutation CreatePage($page: PageCreateInput!) {
    pageCreate(page: $page) {
        page {
        id
        title
        handle
        }
        userErrors {
        code
        field
        message
        }
    }
    }
`;

export const PageUpdate = `#graphql
    mutation UpdatePage($id: ID!, $page: PageUpdateInput!) {
        pageUpdate(id: $id, page: $page) {
            page {
                id
                title
                handle
            }
            userErrors {
                code
                field
                message
            }
        }
    }
`;

export const PageDelete = `#graphql
    mutation DeletePage($id: ID!) {
        pageDelete(id: $id) {
                deletedPageId 
            userErrors {
                code
                field
                message
            }
        }
    }
`;
