import { Request, Response } from "npm:express@4.18.2";
import clienteModel from "./cliente.ts";

const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await clienteModel.findByIdAndDelete({ id }).exec();
    if (!client) {
      res.status(404).send("cliente not found");
      return;
    }
    res.status(200).send("cliente deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteCliente;
