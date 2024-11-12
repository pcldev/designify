import { createRef, useCallback, useEffect, useState } from "react";
import { ROOT_TYPE } from "../constants/element-configs";
import { createStore, Store } from "../libs/external-store";
import { addCssRule } from "../modules/editor/styleInstanceStore";
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
  const elementId = element._id || element.id;

  const _elementStore = getElementStoreById(elementId);

  // Return layer store if existing
  if (_elementStore) {
    return _elementStore;
  }

  const cName = `ds-${elementId.split("-")[0]}`;
  const styleData = element.styleData?.all || "";

  // Create ref and className for element
  element.ref = createRef<HTMLElement>();
  element.className = cName;

  setTimeout(() => {
    addCssRule(
      document.querySelector("iframe")?.contentDocument!,
      `.${cName}`,
      styleData,
    );
  }, 0);

  const elementStore = createStore(elementReducer, element);

  ElementStores.set(elementId, elementStore);

  return elementStore;
}

export function useElementStore(store: Store<any, Action>) {}
export function useElementStyle(elementStore: Store<any, Action>) {
  const [_, setForceUpdate] = useState({});

  const elementId = elementStore.getState()._id;
  const selector = `.ds-${elementId.split("-")[0]}`;

  let styleTag = document
    .querySelector("iframe")
    ?.contentDocument?.getElementById("dynamic-styles") as HTMLStyleElement;

  if (!styleTag) {
    // Create a new style tag if it doesn't exist
    styleTag = document
      .querySelector("iframe")
      ?.contentDocument?.createElement("style");
    styleTag.id = "dynamic-styles";
    document.head.appendChild(styleTag);
  }

  const sheet = styleTag.sheet as CSSStyleSheet;
  const [style, setStyleState] = useState<CSSStyleDeclaration | null>(null);

  // Function to get the current style of the selector
  const getStyle = useCallback(() => {
    if (sheet) {
      for (let i = 0; i < sheet.cssRules.length; i++) {
        const rule = sheet.cssRules[i] as CSSStyleRule;
        if (rule.selectorText === selector) {
          return rule.style;
        }
      }
    }
    return null;
  }, [sheet, selector]);

  // Update the style state on mount or when the selector changes
  useEffect(() => {
    setStyleState(getStyle());
  }, [getStyle]);

  // Function to set new styles for the selector
  const setStyle = useCallback(
    (newStyles: { [key: string]: string }) => {
      if (sheet) {
        let ruleIndex = -1;
        for (let i = 0; i < sheet.cssRules.length; i++) {
          const rule = sheet.cssRules[i] as CSSStyleRule;
          if (rule.selectorText === selector) {
            ruleIndex = i;
            break;
          }
        }

        if (ruleIndex !== -1) {
          // Update existing rule
          const rule = sheet.cssRules[ruleIndex] as CSSStyleRule;
          for (const [property, value] of Object.entries(newStyles)) {
            rule.style.setProperty(property, value);
          }
          setStyleState(rule.style); // Update local style state
        } else {
          // Add new rule if it doesn't exist
          let newRule = `${selector} { `;
          for (const [property, value] of Object.entries(newStyles)) {
            newRule += `${property}: ${value}; `;
          }
          newRule += `}`;
          sheet.insertRule(newRule, sheet.cssRules.length);

          // Update local style state to the newly created rule's style
          setStyleState(getStyle());
        }

        setForceUpdate({});
      }
    },
    [sheet, selector, getStyle],
  );

  return { style, setStyle };
}
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
