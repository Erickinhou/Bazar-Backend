import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import { User } from "@entity/User";
import { Routes } from "./routes";

const PORT = process.env.PORT ?? 3333;

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result
              .then((result) =>
                result !== null && result !== undefined
                  ? res.json(result)
                  : undefined
              )
              .catch((err) => {
                return res.status(err.statusCode ?? 500).json(err);
              });
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(PORT);

    // insert new users for test

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        id: "123",
        cpf: "16494284703",
        email: "willianerick@gmail.com",
        name: "Erick",
        phone: "(38) 999035773",
        password: "123456",
      })
    );

    console.log(
      `Express server has started on port ${PORT}. Open http://localhost:${PORT} to see results`
    );
  })
  .catch((error) => console.log(error));
