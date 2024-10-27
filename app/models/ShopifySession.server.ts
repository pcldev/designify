import mongoose from "~/bootstrap/db/connect-db.server";

const ShopifySessionSchema = new mongoose.Schema(
  {
    id: String,
    expires: Date,
    scope: String,
    state: String,
    userId: Number,
    shop: {
      type: String,
      require: true,
    },
    isOnline: {
      type: Boolean,
      require: true,
    },
    accessToken: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const ShopifySession =
  mongoose.models.ShopifySession ||
  mongoose.model("ShopifySession", ShopifySessionSchema, "shopify_sessions");

export default ShopifySession;
