import "reflect-metadata";
import express from "express";
import createConnection from "./database";
import { router } from "./routes";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/AuthMiddleware";

dotenv.config();

createConnection();
const app = express();

app.use(express.json());

app.use(authMiddleware);
app.use(router);

export { app };
