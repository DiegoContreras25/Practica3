// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import hipotecaModel from "./hipoteca.ts";

const addHipoteca = async (req: Request, res: Response) => {
  try {
    const { cliente, gestor, deuda, cuota } = req.body;
    if (!cliente || !gestor || !deuda || cuota !== 20) {
      res.status(400).send(
        "cliente, gestor y deuda are required and cuota must be 20 ",
      );
      return;
    }
    if (deuda > 1000000) {
      res.status(400).send("La deuda no puede superar el millón de euros");
      return;
    }

    const alreadyExists = await hipotecaModel.findOne({
      cliente,
      gestor,
      deuda,
      cuota,
    }).exec();
    if (alreadyExists) {
      res.status(400).send("hipoteca already exists");
      return;
    }

    const newHipoteca = new hipotecaModel({ cliente, gestor, deuda, cuota });
    await newHipoteca.save();

    res.status(200).send({
      cliente: newHipoteca.cliente,
      gestor: newHipoteca.gestor,
      deuda: newHipoteca.deuda,
      cuota: newHipoteca.cuota,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addHipoteca;
