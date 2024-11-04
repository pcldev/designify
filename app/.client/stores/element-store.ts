import { createRef } from "react";
import { createStore, Store } from "../libs/external-store";
import { ROOT_TYPE } from "../constants/element-configs";
import { IElement } from "../types";

export type ElementStoreAction = {
  [key: string]: any;
};

type Action =
  | { type: "SET_STATE"; payload: { state: any } }
  | { type: "RESET_STATE" };

export type ElementDocument = IElement;

export const DEFAULT_ELEMENT_STATE: any = {};

export const ElementStores = new Map();
window.ElementStores = ElementStores;

export type TElementStore = Store<ElementDocument, Action>;

// export const PSDsStore = createStore(elementReducer, DEFAULT_ELEMENT_STATE);

function elementReducer(state: any, action: Action) {
  switch (action.type) {
    case "SET_STATE": {
      return {
        ...state,
        ...action.payload.state,
      };
    }

    case "RESET_STATE":
      return DEFAULT_ELEMENT_STATE;
    default:
      return state;
  }
}

export function getElementStoreById(_id: string): TElementStore {
  return ElementStores.get(_id);
}

export function createElementStore(element: any): TElementStore {
  const elementId = element._id;

  const _elementStore = getElementStoreById(elementId);

  // Return layer store if existing
  if (_elementStore) {
    return _elementStore;
  }

  // Create ref and className for element
  element.ref = createRef<HTMLElement>();
  element.className = `ds-${elementId.split("-")[0]}`;

  const elementStore = createStore(elementReducer, element);

  ElementStores.set(elementId, elementStore);

  return elementStore;
}

export function useElementStore(store: Store<any, Action>) {}

export function initElementStore({ items }, rootType = "Body") {
  items.forEach((item) => {
    createElementStore(item);
  });
}

export function getRootElementStore() {
  const rootElement = [...ElementStores.values()].find(
    (store) => store?.getState()?.type === ROOT_TYPE,
  );

  return rootElement;
}
