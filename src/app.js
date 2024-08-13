import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { appConfig } from "./config/app.config.js";

const app = express();

// Middlawares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Server running  on ${appConfig.port} port`);
});
