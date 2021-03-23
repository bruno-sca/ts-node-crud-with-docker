import { Router } from "express";
import { UsersController } from "./controllers/UsersController";

const router = Router();

const usersController = new UsersController();

router.get("/users", usersController.show);
router.post("/users", usersController.create);

router.post("/users/signIn", usersController.auth);

export { router };
