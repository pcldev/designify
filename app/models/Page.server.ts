import mongoose from "mongoose";
import { updateElement } from "./Element.server";

const pageSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    elements: [
      {
        type: String,
        ref: "Element",
      },
    ],
    html: String,
    css: String,
    publishedAt: Date,
  },
  { _id: false, timestamps: true, strict: false },
);

const Page =
  mongoose.models.Page || mongoose.model("Page", pageSchema, "pages");

export async function getPageByID(id: string): Promise<any> {
  const page = await Page.findOne({ _id: id }).populate("elements");
  return page;
  // .populate('styles')
  // .populate('shopifyPage')
  // .populate('configs')
  // .populate('oldPage')
}

export async function upsertPage(page: any) {
  const { elements, ...otherProps } = page;
  const elementIds = elements.map((element) => element._id);

  await Promise.all(elements.map((element) => updateElement(element)));

  await Page.findOneAndUpdate(
    {
      _id: page._id,
    },
    { elements: elementIds, ...otherProps },
    { upsert: true },
  );

  const updatedPage = await getPageByID(page._id);

  return updatedPage;
}
