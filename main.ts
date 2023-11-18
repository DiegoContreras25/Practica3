import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { deleteCliente } from "./deleteCliente.ts";
import addCliente from "./addCliente.ts";
import addGestor from "./addGestor.ts";
import addHipoteca from "./addHipoteca.ts";
import { ingresarDinero } from "./ingresarDinero.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const mongo_usr: string = env["MONGO_USR"];
const mongo_pwd: string = env["MONGO_PWD"];
const mongo_uri: string = env["MONGO_URI"];
const db_name: string = env["DB_NAME"];

//CTRL+SHIF+P ->deno initialize
//CTRL+SHIF+P ->deno initialize
if (!mongo_usr || !mongo_pwd || !mongo_uri || !db_name) {
  console.log("Missing env values");
  Deno.exit(1);
}

await mongoose.connect(
  `mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?retryWrites=true&w=majority`,
);

const app = express();
app.use(express.json());
app
  .delete("/deleteCliente/:id", deleteCliente)
  .post("/addCliente", addCliente)
  //no pilla datos opcionales, revisar contructor
  .post("/addGestor", addGestor)
  .post("/addHipoteca", addHipoteca)
  .put("/ingresarDinero/:id/:cantidad", ingresarDinero);
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
