import _ from "lodash";
import { uuid } from "./uuid";

export function replaceIdsOfCatalogElement(_variant: any) {
  const variant = _.cloneDeep(_variant);
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

export function replaceIdsOfItemsAndStyles(items: any[], styles: any[]) {
  const _items = [...items];
  let _styles = [...styles];

  const idMap = new Map(); // Track original ids to new UUIDs

  // First, replace `id` with a UUID for each item and store in the map
  _items.forEach((item) => {
    const newId = uuid();
    idMap.set(item._id, newId); // Map old id to new UUID
    item._id = newId;

    item.className = `ds-${newId.split("-")[0]}`;
  });

  // Then, update `children` arrays using the mapped UUIDs
  _items.forEach((item) => {
    item.children = item.children.map(
      (childId) => idMap.get(childId) || childId,
    );
  });

  _styles.forEach((_style) => {
    _style._id = idMap.get(_style._id) || _style._id;
  });

  return { items: _items, styles: _styles };
}
