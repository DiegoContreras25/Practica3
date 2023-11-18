// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";

import { cliente } from "./types.ts";
import clienteSchema from "./cliente.ts";
import { clienteModelType } from "./cliente.ts";
import { clientModelType } from "../Practica2/client.ts";

export const ingresarDinero = async (
  req: Request<{ id: string; amount: string }, {}, clientModelType>,
  res: Response<cliente | { error: unknown }>,
) => {
  const id = req.params.id;
  const amount = parseInt(req.params.amount, 10);

  try {
    const client = await clienteSchema.findByIdAndUpdate(
      id,
      { $inc: { balance: amount } }, // Use $inc to increment the balance by the specified amount
      { new: true, runValidators: true },
    );

    if (!client) {
      res.status(404).send({ error: "Client not found" });
      return;
    }

    res.status(200).json().send();
  } catch (error) {
    res.status(500).send(error);
  }
};
