import express from "express";
import bodyParser from "body-parser";
import routes from "../route";

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
    parameterLimit: 50000,
  }),
);

// mount all routes on /api path
app.use("/api", routes);


export default app;
