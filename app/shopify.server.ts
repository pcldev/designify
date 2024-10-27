import "@shopify/shopify-app-remix/adapters/node";
import type { WebhookHandler } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-10";
import { createOrUpdateShop } from "~/models/Shop.server";
import { MongooseSessionStorage } from "~/bootstrap/db/session-storage.server";

import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";

const webhookHandler: WebhookHandler = {
  deliveryMethod: DeliveryMethod.Http,
  callbackUrl: "/webhooks",
};

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new MongooseSessionStorage(),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: webhookHandler,
    CUSTOMERS_DATA_REQUEST: webhookHandler,
    CUSTOMERS_REDACT: webhookHandler,
    SHOP_REDACT: webhookHandler,
    SHOP_UPDATE: webhookHandler,
    ORDERS_CREATE: webhookHandler,
    ORDERS_DELETE: webhookHandler,
    ORDERS_UPDATED: webhookHandler,
    ORDERS_CANCELLED: webhookHandler,
    APP_SUBSCRIPTIONS_APPROACHING_CAPPED_AMOUNT: webhookHandler,
  },
  hooks: {
    afterAuth: async ({ session, admin }) => {
      shopify.registerWebhooks({ session });
      await createOrUpdateShop(admin, session);
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    wip_optionalScopesApi: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.April24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
