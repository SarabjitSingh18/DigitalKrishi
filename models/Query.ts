// models/Query.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IQuery extends Document {
  farmerId: mongoose.Types.ObjectId;
  question: string;
  inputType: "text" | "voice" | "image";
  imageUrl?: string;
  response?: string;
  status: "answered" | "pending" | "escalated";
}

const QuerySchema = new Schema<IQuery>({
  farmerId: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
  question: { type: String, required: true },
  inputType: { type: String, enum: ["text", "voice", "image"], default: "text" },
  imageUrl: { type: String },
  response: { type: String },
  status: { type: String, enum: ["answered", "pending", "escalated"], default: "pending" },
}, { timestamps: true });

 const Query = mongoose.models.Query || mongoose.model<IQuery>("Query", QuerySchema);

 export default Query
