import mongoose from "~/bootstrap/db/connect-db.server";

const sessionSchema = new mongoose.Schema(
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
  mongoose.models.Session ||
  mongoose.model("Session", sessionSchema, "sessions");

export default ShopifySession;
