// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";

import { gestor } from "./types.ts";
import gestorSchema from "./gestor.ts";
import gestorModelType from "./gestor.ts";

export const putGestor = async (
  req: Request<{ id: string }, {}, gestorModelType>,
  res: Response<gestor | { error: unknown }>,
) => {
  const id = req.params.id;
  const { name, cliente } = req.body;

  try {
    const gestor = await gestorSchema.findByIdAndUpdate(
      id,
      { name, $push: { cliente } },
      { new: true, runValidators: true },
    );

    if (!gestor) {
      res.status(404).send({ error: "Gestor not found" });
      return;
    }

    // Puedes retornar directamente el objeto gestor si no necesitas transformarlo
    res.status(200).json(gestor).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
