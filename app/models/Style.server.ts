import mongoose from "~/bootstrap/db/connect-db.server";

const styleSchema = new mongoose.Schema(
  {
    _id: String,
    styles: String,
    type: String,
  },
  {
    strict: false,
    timestamps: true,
  },
);

const Style = mongoose.models.Style || mongoose.model("Style", styleSchema);

export default Style;

export async function updateStyle(style: any) {
  const updatedStyle = await Style.findOneAndUpdate({ _id: style._id }, style, {
    upsert: true,
    new: true,
  });

  return updatedStyle;
}
