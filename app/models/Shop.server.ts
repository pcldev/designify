import type { ShopDocument } from "./Shop";
import type { Session } from "@shopify/shopify-api";
import type { AdminApiContext } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import mongoose from "~/bootstrap/db/connect-db.server";

export const DEFAULT_SHOP_DATA = {
  shopConfig: null,
  appConfig: null,
  uninstalledAt: null,
};

const ShopSchema = new mongoose.Schema<ShopDocument>(
  {
    shopDomain: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    shopConfig: {
      type: Object,
      default: DEFAULT_SHOP_DATA.shopConfig,
    },
    appConfig: {
      type: Object,
      default: DEFAULT_SHOP_DATA.appConfig,
    },
    uninstalledAt: {
      type: Date,
      index: true,
      default: DEFAULT_SHOP_DATA.uninstalledAt,
    },
  },
  {
    timestamps: true,
  },
);

const Shop =
  mongoose.models.Shop || mongoose.model<ShopDocument>("Shop", ShopSchema);

export default Shop;

/**
 * Create a new or update an existing shop document with data returned by Shopify API.
 *
 * @param {AdminApiContext} admin
 * @param {Session}         session
 *
 * @returns {Promise<void>}
 */
export async function createOrUpdateShop(
  admin: AdminApiContext,
  session: Session,
): Promise<null | ShopDocument> {
  const { shop: shopDomain } = session;

  const shopResources = await admin.rest.resources.Shop.all({ session });
  const shopConfig = shopResources?.data?.[0];

  if (!shopConfig) {
    return null;
  }

  await Shop.updateOne(
    { shopDomain },
    {
      shopConfig,
      uninstalledAt: null,
    },
    { upsert: true },
  );

  // Update shop usages
  return getShopData(shopDomain);
}

/**
 * Clear all configs stored in a shop document.
 *
 * @param {string} shopDomain
 *
 * @returns {Promise<void>}
 */
export async function clearShopConfigs(shopDomain: string): Promise<void> {
  Shop.updateOne({ shopDomain }, { shopConfig: null, appConfig: null });
}

/**
 * Get shop data.
 *
 * @param {string} shopDomain
 *
 * @returns {Promise<null|ShopDocument>}
 */
export async function getShopData(
  shopDomain: string,
): Promise<null | ShopDocument> {
  const shop = await Shop.findOne({ shopDomain });

  return shop.toObject();
}
