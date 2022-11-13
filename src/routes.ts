import { AuthController } from "@controller/AuthController";
import { UserController } from "@controller/UserController";

const userRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
];

const authRoutes = [
  {
    method: "post",
    route: "/signUp",
    controller: AuthController,
    action: "signUp",
  },
  {
    method: "post",
    route: "/signIn",
    controller: AuthController,
    action: "signIn",
  },
];

export const Routes = [...userRoutes, ...authRoutes];
