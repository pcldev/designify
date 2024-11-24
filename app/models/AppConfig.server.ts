import mongoose from "~/bootstrap/db/connect-db.server";

const appConfigSchema = new mongoose.Schema(
  {
    _id: String,
    shopDomain: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    enabledThemeAppExtension: Boolean,
    ga4Code: String,
  },
  {
    strict: false,
    timestamps: true,
  },
);

const AppConfig =
  mongoose.models.AppConfig || mongoose.model("AppConfig", appConfigSchema);

export default AppConfig;
