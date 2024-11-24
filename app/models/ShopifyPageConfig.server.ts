import mongoose from "~/bootstrap/db/connect-db.server";

const shopifyPageConfigSchema = new mongoose.Schema(
  {
    _id: String,
    shopDomain: String,
    publishedAt: { type: Date, default: null },
    deletedAt: String,
  },
  {
    strict: false,
    timestamps: true,
  },
);

const ShopifyPageConfig =
  mongoose.models.PageConfig ||
  mongoose.model("PageConfig", shopifyPageConfigSchema);

export default ShopifyPageConfig;

export async function upsertShopifyPageConfig(shopifyPageConfig: any) {
  const { _id } = shopifyPageConfig;

  await ShopifyPageConfig.updateOne(
    { _id },
    {
      ...shopifyPageConfig,
    },
    { upsert: true },
  );
}
