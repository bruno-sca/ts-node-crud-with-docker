import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

const publicRoutes = ["/users", "/users/signIn"];

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authentication } = req.headers;

  if (publicRoutes.includes(req.url)) {
    return next();
  }

  try {
    if (!authentication) {
      throw new Error("Authentication does not exists");
    }

    const [_, token] = String(authentication).split(" ");
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    res.locals.loggedUser = payload;

    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

export { authMiddleware };
