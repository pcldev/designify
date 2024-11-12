import { uuid } from "../../utils/uuid";
import { pageStore } from "../../stores/page-store";
import { initElementStore } from "~/.client/stores/element-store";

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
    data: { content: "This is heading text" },
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
    styleData: {
      all: {},
    },
  },
];

export function initPageStore() {
  // TODO: Init page after saving page
  ///////////////////////////////////
  // Init page store when starting

  const items = generateDefaultItemData("regular");

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
      const bodyId = uuid();
      const layoutId = uuid();

      return DUMMY_PAGE;
  }
};
