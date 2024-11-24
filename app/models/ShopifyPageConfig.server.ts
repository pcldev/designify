import mongoose from "~/bootstrap/db/connect-db.server";

const shopifyPageConfigSchema = new mongoose.Schema(
  {
    _id: String,
    shopDomain: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    publishedAt: Boolean,
    deletedAt: String,
  },
  {
    strict: false,
    timestamps: true,
  },
);

const ShopifyAppConfig =
  mongoose.models.PageConfig ||
  mongoose.model("PageConfig", shopifyPageConfigSchema);

export default ShopifyAppConfig;
