// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import clienteSchema from "./cliente.ts";
import { clienteModelType } from "./cliente.ts";

export const deleteCliente = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  const id = req.params.id;
  const subject = await clienteSchema.findByIdAndDelete(id).exec();
  if (!subject) {
    res.status(404).send({ error: "cliente not found" });
    return;
  }
  res.status(200).send("cliente deleted");
};
