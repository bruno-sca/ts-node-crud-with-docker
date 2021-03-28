import { EntityRepository, Repository } from "typeorm";
import { ToDo } from "../models/ToDo";

@EntityRepository(ToDo)
class ToDosRepository extends Repository<ToDo> {}

export { ToDosRepository };
