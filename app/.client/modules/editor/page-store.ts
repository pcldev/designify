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
  { _id: "1", type: "Body", children: ["2"] },
  { _id: "2", type: "Layout", children: ["3"] },
  { _id: "3", type: "Section", children: ["4"] },
  { _id: "4", type: "Row", children: ["5", "7"] },
  { _id: "5", type: "Column", children: ["6"] },
  {
    _id: "6",
    type: "Heading",
    children: [],
    data: { content: "This is heading text" },
  },
  { _id: "7", type: "Column", children: ["8"] },
  {
    _id: "8",
    type: "Button",
    children: [],
    data: { content: "Button" },
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
