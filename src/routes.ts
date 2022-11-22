import { AuthController } from "@controller/AuthController";
import { CategoryController } from "@controller/CategoryController";
import { ProductController } from "@controller/ProductController";
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
    route: "/user/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/user/:id",
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

const productRoutes = [
  {
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all",
  },
  {
    method: "get",
    route: "/product/:id",
    controller: ProductController,
    action: "one",
  },
  {
    method: "post",
    route: "/product",
    controller: ProductController,
    action: "save",
  },
  {
    method: "delete",
    route: "/product/:id",
    controller: ProductController,
    action: "remove",
  },
];

const categoryRoutes = [
  {
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all",
  },
  {
    method: "get",
    route: "/category/:id",
    controller: CategoryController,
    action: "one",
  },
  {
    method: "post",
    route: "/category",
    controller: CategoryController,
    action: "save",
  },
  {
    method: "delete",
    route: "/category/:id",
    controller: CategoryController,
    action: "remove",
  },
];

export const Routes = [
  ...userRoutes,
  ...authRoutes,
  ...productRoutes,
  ...categoryRoutes,
];
