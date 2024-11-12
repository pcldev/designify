import { createStore } from "../libs/external-store";

type Action =
  | { type: "SET_STATE"; payload: { store: any } }
  | { type: "RESET_STATE" };

export const DEFAULT_ELEMENT_SELECTED_STATE: any = {
  store: null,
};

export const ElementSelectedStore = createStore(
  elementSelectedReducer,
  DEFAULT_ELEMENT_SELECTED_STATE,
);

function elementSelectedReducer(state: any, action: Action) {
  switch (action.type) {
    case "SET_STATE": {
      return {
        ...state,
        store: action.payload.store,
      };
    }

    case "RESET_STATE":
      return DEFAULT_ELEMENT_SELECTED_STATE;
    default:
      return state;
  }
}
