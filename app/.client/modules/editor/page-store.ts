import { uuid } from "../../utils/uuid";
import { pageStore } from "../../stores/page-store";
import { initElementStore } from "~/.client/stores/element-store";
import { image_placeholder } from "~/.client/elements/Image";

export const findRootTypeFromItems = (items: any[]) => {
  for (const item of items) {
    if (item.type === "Body") return "Body";
    if (item.type === "FlexSection") return "FlexSection";
    return "Section";
  }
};

const DUMMY_PAGE: any = [
  {
    _id: "1",
    type: "Body",
    children: ["2"],
    styleData: {
      all: {},
    },
  },
  {
    _id: "2",
    type: "Layout",
    children: ["3"],
    styleData: {
      all: {},
    },
  },
  {
    _id: "3",
    type: "Section",
    children: ["4", "9"],
    styleData: {
      all: {},
    },
  },
  {
    _id: "4",
    type: "Row",
    children: ["5", "7"],
    styleData: {
      all: {},
    },
  },
  {
    _id: "9",
    type: "Row",
    children: ["10"],
    styleData: {
      all: {},
    },
  },
  {
    _id: "5",
    type: "Column",
    children: ["6"],
    styleData: {
      all: {},
    },
  },
  {
    _id: "6",
    type: "Heading",
    children: [],
    data: { content: "This is heading text", tag: "h3" },
    styleData: {
      all: {
        "&": "color: rgb(236, 85, 188)",
      },
    },
  },
  {
    _id: "7",
    type: "Column",
    children: ["8"],
    styleData: {
      all: {},
    },
  },
  {
    _id: "8",
    type: "Button",
    children: [],
    data: { content: "Button" },
    styleData: {
      all: {
        "&": "background-color: #000;color: #fff;border: none;padding: 10px 20px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px; margin: 4px 2px;cursor: pointer;",
      },
    },
  },
  {
    _id: "10",
    type: "Image",
    children: [],
    data: {
      src: image_placeholder,
    },
    styleData: {
      all: {},
    },
  },
];

export function initPageStore(page: any) {
  // TODO: Init page after saving page
  ///////////////////////////////////
  // Init page store when starting
  let items = generateDefaultItemData("regular");

  if (page) {
    // Get items
    items = page.elements;

    const cssText = page.css;

    const iframeDocument = document.querySelector("iframe")?.contentDocument;

    if (!iframeDocument) return;

    // Insert styles
    let styleElement = iframeDocument?.getElementById(
      "dynamic-styles",
    ) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = iframeDocument.createElement("style");
      styleElement.id = "dynamic-styles";
      iframeDocument.head.appendChild(styleElement);
    }

    // Ensure the style element exists
    if (styleElement && styleElement.sheet) {
      // Split the CSS into individual rules
      const rules = cssText.split("}");
      rules.forEach((rule) => {
        const trimmedRule = rule.trim();
        if (trimmedRule) {
          // Add each rule using insertRule
          styleElement.sheet?.insertRule(
            `${trimmedRule}}`,
            styleElement.sheet.cssRules.length,
          );
        }
      });
      console.log("CSS rules added successfully.");
    } else {
      console.log("Style element or sheet not found.");
    }
  }

  pageStore.dispatch({
    type: "SET_STATE",
    payload: {
      state: { items },
    },
  });

  initElementStore({ items });
}

type PageType = "regular";

const generateDefaultItemData = (type: PageType) => {
  switch (type) {
    default:
      return DUMMY_PAGE;
  }
};
