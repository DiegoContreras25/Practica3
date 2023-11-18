import { Request, Response } from "npm:express@4.18.2";
import gestorModel from "./gestor.ts";

const addGestor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send("Name is required");
      return;
    }

    const alreadyExists = await gestorModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("gestor already exists");
      return;
    }

    const newGestor = new gestorModel({ name });
    await newGestor.save();

    res.status(200).send({
      name: newGestor.name,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addGestor;
