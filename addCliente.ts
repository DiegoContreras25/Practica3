// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import clienteModel from "./cliente.ts";

const addCliente = async (req: Request, res: Response) => {
  try {
    const { name, dni } = req.body;
    if (!name || !dni) {
      res.status(400).send("Name and dni are required");
      return;
    }

    const alreadyExists = await clienteModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("cliente already exists");
      return;
    }

    const newCliente = new clienteModel({ name, dni });
    await newCliente.save();

    res.status(200).send({
      name: newCliente.name,
      dni: newCliente.dni,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addCliente;
