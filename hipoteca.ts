import mongoose from "npm:mongoose@7.6.3";
import { cliente, gestor } from "./types.ts";

const Schema = mongoose.Schema;

const hipotecaSchema = new Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    gestor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gestor",
      required: true,
    },
    deuda: { type: Number, required: true },
    cuota: { type: Number, required: true },
  },
  { timestamps: true },
);

export type hipotecaModelType = mongoose.Document & {
  cliente: cliente;
  gestor: gestor;
  deuda: number;
  cuota: number;
};

export default mongoose.model<hipotecaModelType>("hipoteca", hipotecaSchema);
