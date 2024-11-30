import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { EActionType } from "~/constants/fetcher-keys";
import AppConfig from "~/models/AppConfig.server";
import { authenticate } from "~/shopify.server";

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const {
      session: { shop: shopDomain },
    } = await authenticate.admin(request);

    // Get action from search params

    const payload = await request.json();

    const action = payload.action;

    switch (action) {
      case EActionType.ENABLE_THEME_APP_EXTENSION: {
        const enabled = payload.enabled;

        await AppConfig.updateOne(
          {
            shopDomain,
          },
          {
            enabledThemeAppExtension: enabled,
          },
        );

        return json({ success: true });
      }

      case EActionType.SET_GA4_CODE: {
        const ga4Code = payload.ga4Code;

        await AppConfig.updateOne(
          {
            shopDomain,
          },
          {
            ga4Code,
          },
        );

        return json({ success: true });
      }
    }
  } catch (e: any) {
    return json({ success: false, message: e?.message || e });
  }
};
