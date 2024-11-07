import { uuid } from "./uuid";

export function replaceIdsOfCatalogElement(variant: any) {
  const idMap = new Map(); // Track original ids to new UUIDs

  // First, replace `id` with a UUID for each item and store in the map
  variant.items.forEach((item) => {
    const newId = uuid();
    idMap.set(item._id, newId); // Map old id to new UUID
    item._id = newId;
  });

  // Then, update `children` arrays using the mapped UUIDs
  variant.items.forEach((item) => {
    item.children = item.children.map(
      (childId) => idMap.get(childId) || childId,
    );
  });

  return variant;
}
