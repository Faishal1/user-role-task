// config should be imported before importing any other file
import app from "./config/express";
import knex from './database';


if (!module.parent) {
  // listen on port config.port
  app.listen(4040, () => {
    console.log(`server started on port 4040`);
  });
}

export default app;
