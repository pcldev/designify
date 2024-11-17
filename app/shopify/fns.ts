export function getMyShopifySubdomainName(shopDomain: string) {
  return shopDomain?.replace(".myshopify.com", "");
}

export function flattenGraphQLConnectionResults(
  results: any[],
  keysToFlatten: string[],
) {
  return results.map((result: any) => {
    keysToFlatten.forEach((key: string) => {
      result[key] = result[key]?.nodes;
    });

    return result;
  });
}
