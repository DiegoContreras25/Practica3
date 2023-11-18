import mongoose from "npm:mongoose@7.6.3";
import { gestor } from "./types.ts";

const Schema = mongoose.Schema;

const gestorSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export type gestorModelType = mongoose.Document & Omit<gestor, "id">;

export default mongoose.model<gestorModelType>("gestor", gestorSchema);
