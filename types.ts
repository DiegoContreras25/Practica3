import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
export type gestor = {
  id: string;
  name: string;
  cliente: cliente[];
};

export type cliente = {
  id: string;
  name: string;
  dni: string;
  saldo: number;
};

export type hipoteca = {
  id: string;
  cliente: cliente;
  gestor: gestor;
  deuda: number;
  cuota: number;
};
