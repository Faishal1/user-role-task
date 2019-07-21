import express from "express";
import c from "./helpers/controlHandler";
import userController from "./app/Users/controller";

const router = express.Router();

router
  .route("/users/")
  // create user (accessed at POST /api/users/)
  .post(c(userController.createUser, ({ body }) => [body]));
export default router;
