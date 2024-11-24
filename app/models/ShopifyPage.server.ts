import mongoose from "mongoose";
import { updateElement } from "./Element.server";
import { updateStyle } from "./Style.server";

const pageSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, default: "Untitled" },
    elements: [
      {
        type: String,
        ref: "Element",
      },
    ],
    styles: [
      {
        type: String,
        ref: "Style",
      },
    ],
    html: String,
    css: String,
    publishedAt: { type: Date, default: null },
    shopDomain: String,
  },
  { _id: false, timestamps: true, strict: false },
);

export const ShopifyPage =
  mongoose.models.Page || mongoose.model("Page", pageSchema, "pages");

export async function getPageByID(id: string): Promise<any> {
  const page = await ShopifyPage.findOne({ _id: id })
    .populate("elements")
    .populate("styles");

  return page;
  // .populate('styles')
  // .populate('shopifyPage')
  // .populate('configs')
  // .populate('oldPage')
}

export async function upsertPage(page: any) {
  const { elements, ...otherProps } = page;
  const elementIds = elements.map((element: any) => element._id);
  const styles = elements.map((element: any) => element.styles);
  const styleIds = styles.map((style: any) => style._id);

  // Upsert element
  await Promise.all(
    elements.map((element: any) => {
      const { styles, ...otherElementProps } = element;

      return updateElement(otherElementProps);
    }),
  );

  // Upsert styles
  await Promise.all(
    styles.map((style: any) => {
      return updateStyle(style);
    }),
  );

  await ShopifyPage.findOneAndUpdate(
    {
      _id: page._id,
    },
    { elements: elementIds, styles: styleIds, ...otherProps },
    { upsert: true },
  );

  const updatedPage = await getPageByID(page._id);

  return updatedPage;
}
