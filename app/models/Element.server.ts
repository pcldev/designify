import mongoose from "mongoose";

const elementSchema = new mongoose.Schema(
  {
    _id: String,
    type: { type: String, required: true },
    children: [String],
    styles: [String],
    data: {},
  },
  { _id: false, timestamps: true, strict: false },
);

const Element =
  mongoose.models.Element ||
  mongoose.model("Element", elementSchema, "elements");

export function getElementById(id: string) {
  return new Promise((resolve, reject) => {
    Element.findById(id, (err, data) => {
      if (err) {
        reject(JSON.stringify(err));
      } else {
        resolve(data);
      }
    });
  });
}

export function getElementByIds(ids: string[]): Promise<any[]> {
  return Element.find({
    _id: { $in: ids },
  });
}

export async function updateElement(element: any) {
  if (!element.data) {
    element.data = {};
  }

  const updatedElement = await Element.findOneAndUpdate(
    { _id: element._id },
    element,
    { upsert: true, new: true },
  );

  return updatedElement;
}

export async function removeItem(id: string) {
  await Element.deleteOne({ _id: id });
}
