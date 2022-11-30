import { AuthController } from "@controller/AuthController";
import { OrderController } from "@controller/OrderController";
import { CategoryController } from "@controller/CategoryController";
import { ProductController } from "@controller/ProductController";
import { UserController } from "@controller/UserController";
import { OrderProductController } from "@controller/OrderProductController";
import { AddressController } from "@controller/AddressController";
import { ReportController } from "@controller/ReportController";

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
    method: "put",
    route: "/user/:id",
    controller: UserController,
    action: "update",
  },
  {
    method: "delete",
    route: "/user/:id",
    controller: UserController,
    action: "remove",
  },
];

const addressRoutes = [
  {
    method: "get",
    route: "/addresses",
    controller: AddressController,
    action: "all",
  },
  {
    method: "get",
    route: "/address/:id",
    controller: AddressController,
    action: "one",
  },
  {
    method: "post",
    route: "/address",
    controller: AddressController,
    action: "save",
  },
  {
    method: "delete",
    route: "/address/:id",
    controller: AddressController,
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

const orderRoutes = [
  {
    method: "get",
    route: "/orders",
    controller: OrderController,
    action: "all",
  },
  {
    method: "get",
    route: "/order/:id",
    controller: OrderController,
    action: "one",
  },
  {
    method: "post",
    route: "/order",
    controller: OrderController,
    action: "save",
  },
  {
    method: "put",
    route: "/order/:id",
    controller: OrderController,
    action: "update",
  },
  {
    method: "delete",
    route: "/order/:id",
    controller: OrderController,
    action: "remove",
  },
];

const orderProductRoutes = [
  {
    method: "get",
    route: "/orderProducts",
    controller: OrderProductController,
    action: "all",
  },
  {
    method: "get",
    route: "/orderProducts/:id",
    controller: OrderProductController,
    action: "one",
  },
  {
    method: "post",
    route: "/orderProducts",
    controller: OrderProductController,
    action: "save",
  },
];

const reportRoutes = [
  {
    method: "get",
    route: "/report/users",
    controller: ReportController,
    action: "users",
  },
  {
    method: "get",
    route: "/report/orders",
    controller: ReportController,
    action: "orders",
  },
];

export const Routes = [
  ...userRoutes,
  ...addressRoutes,
  ...authRoutes,
  ...productRoutes,
  ...categoryRoutes,
  ...orderRoutes,
  ...orderProductRoutes,
  ...reportRoutes,
];
