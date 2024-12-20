import {
  clearAllElementStore,
  initElementStore,
} from "~/.client/stores/element-store";
import { replaceIdsOfItemsAndStyles } from "~/.client/utils/replace-ids-of-catalog-element";
import { PAGE_TEMPLATES } from "~/components/page-templates";
import { DEFAULT_PAGE_STATE, pageStore } from "../../stores/page-store";
import { uuid } from "../../utils/uuid";
import { getElementSelector } from "./configs";

export const findRootTypeFromItems = (items: any[]) => {
  for (const item of items) {
    if (item.type === "Body") return "Body";
    if (item.type === "FlexSection") return "FlexSection";
    return "Section";
  }
};

const DEFAULT_PAGE_ELEMENTS = [{}];

// const DUMMY_PAGE: any = [
//   {
//     _id: "1",
//     type: "Body",
//     children: ["2"],
//     styleData: {
//       all: {},
//     },
//   },
//   {
//     _id: "2",
//     type: "Layout",
//     children: ["3"],
//     styleData: {
//       all: {},
//     },
//   },
//   {
//     _id: "3",
//     type: "Section",
//     children: ["4", "9"],
//     styleData: {
//       all: {},
//     },
//   },
//   {
//     _id: "4",
//     type: "Row",
//     children: ["5", "7"],
//     styleData: {
//       all: {},
//     },
//   },
//   {
//     _id: "9",
//     type: "Row",
//     children: ["10"],
//     styleData: {
//       all: {},
//     },
//   },
//   {
//     _id: "5",
//     type: "Column",
//     children: ["6"],
//     styleData: {
//       all: {},
//     },
//   },
//   {
//     _id: "6",
//     type: "Heading",
//     children: [],
//     data: { content: "This is heading text", tag: "h3" },
//     styleData: {
//       all: {
//         "&": "color: rgb(236, 85, 188)",
//       },
//     },
//   },
//   {
//     _id: "7",
//     type: "Column",
//     children: ["8"],
//     styleData: {
//       all: {},
//     },
//   },
//   {
//     _id: "8",
//     type: "Button",
//     children: [],
//     data: { content: "Button" },
//     styleData: {
//       all: {
//         "&": "background-color: #000;color: #fff;border: none;padding: 10px 20px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px; margin: 4px 2px;cursor: pointer;",
//       },
//     },
//   },
//   {
//     _id: "10",
//     type: "Image",
//     children: [],
//     data: {
//       src: image_placeholder,
//     },
//     styleData: {
//       all: {},
//     },
//   },
// ];

export function initPageStore(page: any, pageTemplateId: string | null) {
  // Init page store when starting
  let items = generateDefaultItemData("regular");

  let title = DEFAULT_PAGE_STATE.title;

  let publishedAt = null;
  let handle = "";

  if (page) {
    // Get items
    title = page.title;
    items = page.elements;

    publishedAt = page.pageConfig.publishedAt;
    handle = page.pageConfig.handle;

    const styles = page.styles;

    initStyleData(styles);
  } else if (pageTemplateId) {
    const template = PAGE_TEMPLATES.find(
      (template) => template.id === pageTemplateId,
    );

    const templateItems = template?.items || [];
    const templateStyles = template?.styles || [];

    const { items: _items, styles } = replaceIdsOfItemsAndStyles(
      templateItems,
      templateStyles,
    );

    // // Grant items to new items
    items = _items;

    try {
      initStyleData(styles);
    } catch (e) {
      console.log(e);
    }
  }

  pageStore.dispatch({
    type: "SET_STATE",
    payload: {
      state: { items, title, handle, publishedAt },
    },
  });

  initElementStore({ items });
}

export function clearPageStore() {
  // Reset items
  pageStore.dispatch({
    type: "SET_STATE",
    payload: {
      state: { items: [] },
    },
  });

  // Clear all element stores
  clearAllElementStore();
}

type PageType = "regular";

const generateDefaultItemData = (type: PageType) => {
  const bodyRootId = uuid();
  const layoutId = uuid();

  return [
    {
      _id: bodyRootId,
      type: "Body",
      children: [layoutId],
      styleData: {
        all: {},
      },
    },
    {
      _id: layoutId,
      type: "Layout",
      children: [],
      styleData: {
        all: {},
      },
    },
  ];
};

function initStyleData(styles: any[]) {
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

    styles.map((style) => {
      try {
        styleElement.sheet?.insertRule(
          `.${getElementSelector(style._id)} ${style.styles || "{}"}`.trim(),
          styleElement.sheet.cssRules.length,
        );
      } catch (e) {
        console.error(e);
      }
    });

    console.log("CSS rules added successfully.");
  } else {
    console.log("Style element or sheet not found.");
  }
}
