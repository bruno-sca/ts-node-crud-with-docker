import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { ToDosRepository } from "../repositories/ToDosRepository";

class ToDosController {
  async create(request: Request, response: Response) {
    let { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required("Campo nome é obrigatório"),
      description: yup.string().required("Campo nome é obrigatório"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error });
    }

    const toDosRepository = getCustomRepository(ToDosRepository);

    const user = response.locals.loggedUser;

    const toDo = toDosRepository.create({
      user_id: user.id,
      title,
      description,
    });

    return response.status(201).json(toDo);
  }
}

export { ToDosController };
