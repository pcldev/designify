export interface ShopDocument {
  _id: string;
  shopDomain: string;
  shopConfig: {
    [key: string]: any;
  };
  appConfig: {
    [key: string]: any;
  };
  uninstalledAt?: Date | string | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
}
