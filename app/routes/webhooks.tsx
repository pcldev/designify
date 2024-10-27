import type { ActionFunctionArgs } from "@remix-run/node";
import Shop, { clearShopConfigs } from "~/models/Shop.server";
import ShopifySession from "~/models/ShopifySession.server";
import { authenticate } from "~/shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    topic,
    shop: shopDomain,
    admin,
    payload,
  } = await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  try {
    switch (topic) {
      case "APP_UNINSTALLED": {
        // Clear all shop sessions
        await ShopifySession.deleteMany({ shop: shopDomain });

        // Remove all products imported from external sources

        // Mark shop as uninstalled and clear shop config in the `shops` collection
        await Shop.updateOne(
          { shopDomain },
          { shopConfig: null, appConfig: null, uninstalledAt: new Date() },
        );

        break;
      }

      case "SHOP_UPDATE": {
        // Update shop config in app database
        await Shop.updateOne({ shopDomain }, { shopConfig: payload });

        break;
      }

      case "CUSTOMERS_DATA_REQUEST": {
        // Do nothing
        break;
      }

      case "CUSTOMERS_REDACT":
      case "SHOP_REDACT": {
        // Remove all shop data
        await clearShopConfigs(shopDomain);

        break;
      }

      default: {
        throw new Response("Unhandled webhook topic", { status: 404 });
      }
    }
  } catch (e) {
    console.error(e);

    if (e instanceof Response) {
      throw e;
    }
  }

  throw new Response();
};
