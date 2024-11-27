import type {
  ConnectionArguments,
  ProductInputMutationSchema,
  ProductMediaInputSchema,
  VariantInputSchema,
  ProductVariantQuerySchema,
  Page,
} from "./types";
import type { AdminApiContext } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import type { GraphQLResponse } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients/types";
import { flattenGraphQLConnectionResults } from "../fns";
import { queryForWebhooks } from "./webhooks/query.server";
import { getObjectValueByKeyPath } from "~/bootstrap/fns/misc";
import { deleteWebhookMutation } from "./webhooks/mutation.server";
import {
  queryForMediaImagesByIds,
  queryForMediaImages,
} from "./files/query.server";
import {
  mutationFileCreate,
  mutationStagedUploadsCreate,
} from "./files/mutation.server";
import {
  queryForAppId,
  queryForAppMetafield,
  queryForAppInfo,
} from "./app/query.server";
import {
  mutationMetafieldDelete,
  mutationCreateAppDataMetafield,
} from "./app/mutation.server";
import {
  queryForProductMedia,
  queryForProducts,
  queryForProductVariants,
} from "~/shopify/graphql/products/query.server";
import {
  deleteMediaMutation,
  productCreateMediaMutation,
  productCreateMutation,
  productReorderMediaMutation,
  productStatusMutation,
  productUpdateMediaMutation,
  productVariantsBulkCreateMutation,
  productVariantUpdateMutation,
} from "./products/mutation.server";
import { publishablePublishMutation } from "./store-properties/mutation.server";
import { getStorePublicationsQuery } from "./store-properties/query.server";
import {
  PageCreate,
  PageDelete,
  PageUpdate,
} from "./online-stores/mutation.server";

export class ShopifyApiClient {
  admin: AdminApiContext;

  constructor(admin: AdminApiContext) {
    this.admin = admin;
  }

  async getAppId() {
    return verifyResponse(
      await this.admin.graphql(queryForAppId),
      "currentAppInstallation.id",
    );
  }

  async getAppTitle() {
    return verifyResponse(
      await this.admin.graphql(queryForAppInfo),
      "app.title",
    );
  }

  async getAppHandle() {
    return verifyResponse(
      await this.admin.graphql(queryForAppInfo),
      "app.handle",
    );
  }

  async getProducts(params: ConnectionArguments = {}) {
    return verifyResponse(
      await this.admin.graphql(queryForProducts(params)),
      "products",
    );
  }

  async getProductsByIds(productIds: string[]): Promise<any[]> {
    if (!productIds.length) {
      return [];
    }

    return flattenGraphQLConnectionResults(
      await verifyResponse(
        await this.admin.graphql(
          queryForProducts({ query: convertIdsToQuery(productIds) }),
        ),
        "products.nodes",
      ),
      ["variants"],
    );
  }

  async getProductMedia(productId: string): Promise<any[]> {
    if (!productId) {
      return [];
    }

    return verifyResponse(
      await this.admin.graphql(queryForProductMedia, {
        variables: { productId },
      }),
      "product.media.edges",
    );
  }

  // @deprecated This function is deprecated and will be removed later
  async getProductVariantsLegacy(
    productId: string,
  ): Promise<ProductVariantQuerySchema[]> {
    if (!productId) {
      return [];
    }

    return verifyResponse(
      await this.admin.graphql(queryForProductMedia, {
        variables: { productId },
      }),
      "product.variants.edges",
    );
  }

  async getProductVariants(params: ConnectionArguments = {}): Promise<any> {
    return verifyResponse(
      await this.admin.graphql(queryForProductVariants(params)),
      "productVariants",
    );
  }

  async getMediaFilesByIds(ids: string[]): Promise<any[]> {
    if (!ids.length) {
      return [];
    }

    return verifyResponse(
      await this.admin.graphql(queryForMediaImagesByIds(ids)),
      "nodes",
    );
  }

  async getMediaFiles(params: ConnectionArguments = {}): Promise<any> {
    return verifyResponse(
      await this.admin.graphql(queryForMediaImages(params)),
      "files",
    );
  }

  async removeMediaFiles(ids: string[], productId: string) {
    if (!ids.length) {
      return [];
    }

    return verifyResponse(
      await this.admin.graphql(deleteMediaMutation, {
        variables: {
          mediaIds: ids,
          productId,
        },
      }),
    );
  }

  async createProductMedia(
    media: { alt: string; mediaContentType: string; originalSource: string },
    productId: string,
  ) {
    return verifyResponse(
      await this.admin.graphql(productCreateMediaMutation, {
        variables: {
          media,
          productId,
        },
      }),
    );
  }

  async updateProductStatus(id: string, status: "DRAFT" | "ACTIVE") {
    return verifyResponse(
      await this.admin.graphql(productStatusMutation, {
        variables: {
          input: {
            id,
            status,
          },
        },
      }),
    );
  }

  async createProduct(
    productData: ProductInputMutationSchema,
    media: ProductMediaInputSchema[],
  ) {
    return verifyResponse(
      await this.admin.graphql(productCreateMutation, {
        variables: {
          product: productData,
          media,
        },
      }),
    );
  }

  async createBulkProductVariants(
    productId: string,
    variants: VariantInputSchema[],
  ) {
    return verifyResponse(
      await this.admin.graphql(productVariantsBulkCreateMutation, {
        variables: {
          productId,
          variants,
        },
      }),
    );
  }

  async productUpdateMedia(
    productId: string,
    media: { id: string; previewImageSource: string }[],
  ) {
    return verifyResponse(
      await this.admin.graphql(productUpdateMediaMutation, {
        variables: {
          media,
          productId,
        },
      }),
    );
  }

  async productReorderMedia(
    productId: string,
    moves: { id: string; newPosition: number }[],
  ) {
    return verifyResponse(
      await this.admin.graphql(productReorderMediaMutation, {
        variables: {
          moves,
          id: productId,
        },
      }),
    );
  }

  async productVariantUpdate(variantId: string, mediaId: string) {
    return verifyResponse(
      await this.admin.graphql(productVariantUpdateMutation, {
        variables: {
          input: {
            mediaId: mediaId,
            id: variantId,
          },
        },
      }),
    );
  }

  async createStagedUploads(
    input: {
      filename: string;
      fileSize: string;
      mimeType: string;
      resource: string;
      httpMethod: string;
    }[],
  ): Promise<any> {
    return verifyResponse(
      await this.admin.graphql(mutationStagedUploadsCreate, {
        variables: { input },
      }),
      "stagedUploadsCreate",
    );
  }

  async createFile(
    files: [
      {
        alt: string;
        filename: string;
        originalSource: string;
        contentType: "IMAGE" | "FILE";
      },
    ],
  ): Promise<any[]> {
    return verifyResponse(
      await this.admin.graphql(mutationFileCreate, { variables: { files } }),
      "fileCreate",
    );
  }

  async getAppMetafields(ownerId?: string) {
    const appId = await this.getAppId();

    if (!ownerId) {
      ownerId = appId;
    }

    return verifyResponse(
      await this.admin.graphql(queryForAppMetafield, {
        variables: { ownerId: ownerId },
      }),
    );
  }

  async upsertAppMetafields(
    metafieldsSetInput: {
      key: string;
      type: string;
      value: string;
      ownerId?: string;
      namespace: string;
    }[],
  ) {
    // Prepare input objects
    let appId;

    for (let i = 0; i < metafieldsSetInput.length; i++) {
      if (!metafieldsSetInput[i].ownerId) {
        appId = appId || (await this.getAppId());
        metafieldsSetInput[i].ownerId = appId;
      }
    }

    return verifyResponse(
      await this.admin.graphql(mutationCreateAppDataMetafield, {
        variables: { metafieldsSetInput },
      }),
      "metafieldsSet",
    );
  }

  async deleteAppMetafield(input: { id: string }) {
    return verifyResponse(
      await this.admin.graphql(mutationMetafieldDelete, {
        variables: { input },
      }),
      "metafieldDelete",
    );
  }

  /** Store properties */

  /** Get store's publication */
  async getStorePublications() {
    return verifyResponse(
      await this.admin.graphql(getStorePublicationsQuery),
      "publications.edges",
    );
  }

  /** Publishes a resource to a channel */
  async publishablePublish(productId: string, publicationId: string) {
    return verifyResponse(
      await this.admin.graphql(publishablePublishMutation, {
        variables: {
          id: productId,
          input: {
            publicationId,
          },
        },
      }),
    );
  }

  /** Online Stores */
  async createPage(page: Page) {
    return verifyResponse(
      await this.admin.graphql(PageCreate, {
        variables: {
          page,
        },
      }),
      "pageCreate",
    );
  }

  async updatePage(shopifyPageId: string, page: Page) {
    return verifyResponse(
      await this.admin.graphql(PageUpdate, {
        variables: {
          id: shopifyPageId,
          page,
        },
      }),
      "pageUpdate",
    );
  }

  async deletePage(shopifyPageId: string) {
    return verifyResponse(
      await this.admin.graphql(PageDelete, {
        variables: {
          id: shopifyPageId,
        },
      }),
      "pageDelete",
    );
  }

  /** WEBHOOKS */
  async getWebhooks() {
    return verifyResponse(await this.admin.graphql(queryForWebhooks));
  }

  async deleteWebhook(webhookId: string) {
    const response = await this.admin.graphql(deleteWebhookMutation, {
      variables: { id: webhookId },
    });

    return response;
  }
}

export function convertIdsToQuery(ids: string[]): string {
  try {
    // Extract the numeric ID from each GID and format them into the desired query format
    return (ids || [])
      .filter((i) => !!i)
      .map((id) => `(id:${id.toString().split("/").pop()})`)
      .join(" OR ");
  } catch (e) {
    console.error(e);
    return "";
  }
}

export async function verifyResponse(
  result: GraphQLResponse<any, any>,
  dataKeyPath?: string,
) {
  const _result =
    typeof result.json === "function" ? await result.json() : result;

  const data = dataKeyPath
    ? getObjectValueByKeyPath(_result, `data.${dataKeyPath}`)
    : _result.data;

  if (!data || data?.userErrors?.length) {
    throw new Error(data?.userErrors?.[0]?.message || "UNKNOWN");
  }

  return data;
}
