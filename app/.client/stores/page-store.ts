import { createStore, Store } from "../libs/external-store";
import { IElement } from "../types";

export type PageStoreAction = {
  [key: string]: any;
};

type Action =
  | { type: "SET_STATE"; payload: { state: any } }
  | { type: "RESET_STATE" };

export type PageDocument = {
  title: string;
  publishedAt: Date | null;
  handle: string;
  items: IElement[];
};

export const DEFAULT_PAGE_STATE: PageDocument = {
  title: "Untitled",
  publishedAt: null,
  handle: "",
  items: [],
};

export type TPageStore = Store<PageDocument, Action>;

export const pageStore = createStore(pageReducer, DEFAULT_PAGE_STATE);

function pageReducer(state: PageDocument, action: Action) {
  switch (action.type) {
    case "SET_STATE": {
      const updatedState = {
        ...state,
        ...action.payload.state,
      };

      return updatedState;
    }

    case "RESET_STATE":
      return DEFAULT_PAGE_STATE;
    default:
      return state;
  }
}
