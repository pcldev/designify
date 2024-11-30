export type ConnectionArguments = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  query?: string;
  reverse?: boolean;
  sortKey?: string;
};

export type MediaImageQuerySchema = {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type MediaNodeQuerySchema = {
  id: string;
  media: {
    edges: {
      node: {
        id: string;
        alt: string;
        image: MediaImageQuerySchema;
      };
    }[];
  };
};

export type ProductVariantQuerySchema = {
  node: MediaNodeQuerySchema;
};

export type ProductOptionsInputSchema = {
  name: string;
  values: { name: string }[];
};

type ProductMediaInputSchema = {
  mediaContentType: "VIDEO" | "EXTERNAL_VIDEO" | "MODEL_3D" | "IMAGE";
  originalSource: string;
};

export type ProductInputMutationSchema = {
  title: string;
  descriptionHtml: string;
  vendor: string;
  status: "DRAFT" | "ACTIVE";
  productOptions: ProductOptionsInputSchema[];
};

export type VariantInputSchema = {
  optionValues: {
    name: string;
    optionName: string;
  }[];
  price: number;
  inventoryItem: {
    cost: number;
  };
  metafields?: VariantMetafieldInputSchema[];
};

type VariantMetafieldInputSchema = {
  namespace: string;
  key: string;
  value: any;
  type: string;
};

export type Page = {
  title?: string;
  templateSuffix?: string;
  publishDate?: Date;
  isPublished: boolean;
  handle?: string;
  body?: string;
  publishDate?: Date;
};

export type Theme = {
  created_at: string;
  id: number;
  name: string;
  previewable: boolean;
  processing: boolean;
  role: ThemeRole;
  theme_store_id: number;
  updated_at: string;
};
