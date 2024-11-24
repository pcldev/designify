import mongoose from "~/bootstrap/db/connect-db.server";

const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      index: true,
    },
    name: {
      type: String,
      index: true,
    },
    nameWithoutExtension: {
      type: String,
      index: true,
    },
    shopifyId: {
      type: String,
      index: true,
    },
    // The shop domain that owns the image
    shopDomain: {
      type: String,
      index: true,
      required: true,
    },
  },
  { timestamps: true, strict: false },
);

const ShopifyFile =
  mongoose.models.File || mongoose.model("File", fileSchema, "files");

export default ShopifyFile;
