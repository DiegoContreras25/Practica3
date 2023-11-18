import { Request, Response } from "npm:express@4.18.2";
import hipotecaModel from "./hipoteca.ts";

const addHipoteca = async (req: Request, res: Response) => {
  try {
    const { cliente, gestor, cuota } = req.body;
    if (!cliente || !gestor || !cuota) {
      res.status(400).send("cliente, gestor y cuota are required");
      return;
    }

    const alreadyExists = await hipotecaModel.findOne({
      cliente,
      gestor,
      cuota,
    }).exec();
    if (alreadyExists) {
      res.status(400).send("hipoteca already exists");
      return;
    }

    const newHipoteca = new hipotecaModel({ cliente, gestor, cuota });
    await newHipoteca.save();

    res.status(200).send({
      cliente: newHipoteca.cliente,
      gestor: newHipoteca.gestor,
      cuota: newHipoteca.cuota,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addHipoteca;
