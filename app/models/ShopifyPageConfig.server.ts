import mongoose from "~/bootstrap/db/connect-db.server";

const shopifyPageConfigSchema = new mongoose.Schema(
  {
    _id: { type: String, index: true },
    shopifyPageId: String,
    handle: String,
    publishedAt: { type: Date, default: null },
    deletedAt: String,
  },
  { _id: false, timestamps: true, strict: false },
);

const ShopifyPageConfig =
  mongoose.models.PageConfig ||
  mongoose.model("PageConfig", shopifyPageConfigSchema);

export default ShopifyPageConfig;

export async function upsertShopifyPageConfig(shopifyPageConfig: any) {
  const { _id, shopDomain, ...otherProps } = shopifyPageConfig;

  delete shopifyPageConfig.shopDomain;

  await ShopifyPageConfig.updateOne(
    { _id },
    {
      _id,
      ...otherProps,
    },
    { upsert: true },
  );
}
