import express from "express";
import order from "./controllers/order.js";
import employee from "./controllers/employee.js";

const routes = express.Router();

//Rotas do funcionarios
routes.get("/auth", employee.findAll);
routes.post("/auth", employee.addEmployee);

//rotas dos pedidos
routes.get("/order", order.findAll);
routes.post("/order", order.addOrder);
routes.get("/order/:id", order.findOrder);
routes.put("/order/:id", order.updateOrder);
routes.delete("/order/:id", order.deleteOrder);

export { routes as default };
