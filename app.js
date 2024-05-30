import DotEnv from "dotenv";
DotEnv.config();

import Express from "express";
import Mongoose from "mongoose";
import bodyParser from "body-parser";
import Controllers from "./controllers.js";

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", Controllers.getHome);
app.get("/:passkey", Controllers.getEntries);
app.post("/", Controllers.addEntry);

Mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log({ err });
  });
