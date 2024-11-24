import mongoose from "~/bootstrap/db/connect-db.server";

const errorLogSchema = new mongoose.Schema(
  {
    _id: String,
    shopDomain: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    name: String,
    description: String,
    status: String,
  },
  {
    strict: false,
    timestamps: true,
  },
);

const ErrorLog =
  mongoose.models.ErrorLog || mongoose.model("ErrorLog", errorLogSchema);

export default ErrorLog;
