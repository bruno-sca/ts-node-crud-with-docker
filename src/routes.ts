import { Router } from "express";
import { ToDosController } from "./controllers/ToDosController";
import { UsersController } from "./controllers/UsersController";

const router = Router();

const usersController = new UsersController();
const toDosController = new ToDosController();

router.get("/users", usersController.index);
router.post("/users", usersController.create);
router.post("/users/signIn", usersController.auth);

router.get("/todo", toDosController.index);
router.post("/todo", toDosController.create);
router.patch("/todo", toDosController.update);

export { router };
