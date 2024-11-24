import mongoose from "~/bootstrap/db/connect-db.server";

export const DEFAULT_SHOP_DATA = {
  shopConfig: null,
  appConfig: null,
  uninstalledAt: null,
};

const ShopConfigSchema = new mongoose.Schema(
  {
    _id: String,
    shopDomain: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    address: String,
    country: String,
    currency: String,
    domain: String,
    email: String,
    timezone: String,
    name: String,
    phone: String,
  },
  {
    timestamps: true,
  },
);

const ShopConfig =
  mongoose.models.ShopConfig || mongoose.model("ShopConfig", ShopConfigSchema);

export default ShopConfig;
