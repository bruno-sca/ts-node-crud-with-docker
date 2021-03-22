import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";

import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Campo nome é obrigatório"),
      email: yup
        .string()
        .email("E-mail Inválido")
        .required("Campo e-mail é obrigatório"),
      password: yup.string().required("Campo senha é obrigatório"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error });
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return response.status(400).json({
        error: "User Already exists!",
      });
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    delete user.password;

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const all = await usersRepository.find();

    all.forEach((user) => {
      delete user.password;
    });

    return response.json(all);
  }

  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;

    const schema = yup.object().shape({
      email: yup
        .string()
        .email("E-mail Inválido")
        .required("Campo e-mail é obrigatório"),
      password: yup.string().required("Campo senha é obrigatório"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error });
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({
      email,
    });

    if (!userExists) {
      return response.status(401).json({
        error: "Usuário não encontrado!",
      });
    }

    if (userExists.password !== password) {
      return response.status(401).json({
        error: "Senha incorreta!",
      });
    }

    delete userExists.password;

    return response.status(201).json(userExists);

    // const requestUser = usersRepository.create({
    //   email,
    //   password,
    // });
  }
}

export { UsersController };