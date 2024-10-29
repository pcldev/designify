declare module "*.css";

declare namespace NodeJS {
  interface ProcessEnv {
    readonly MONGODB_URI: string;
  }
}

interface MyShopify {
  designify: {
    [key: string]: any;
  };
}

interface Window {
  [key: string]: any;
  shopify: MyShopify & ShopifyGlobal;
}

type RequestBody = {
  payload?: any;
};

type RequestOptions = RequestInit & RequestBody;
