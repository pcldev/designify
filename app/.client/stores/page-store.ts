import { createStore, Store } from "../libs/external-store";

export type PageStoreAction = {
  [key: string]: any;
};

type Action =
  | { type: "SET_STATE"; payload: { state: any } }
  | { type: "RESET_STATE" };

export type PageDocument = any;

export const DEFAULT_PAGE_STATE: any = {};

export type TPageStore = Store<PageDocument, Action>;

export const pageStore = createStore(pageReducer, DEFAULT_PAGE_STATE);

function pageReducer(state: any, action: Action) {
  switch (action.type) {
    case "SET_STATE": {
      return {
        ...state,
        ...action.payload.state,
      };
    }

    case "RESET_STATE":
      return DEFAULT_PAGE_STATE;
    default:
      return state;
  }
}
