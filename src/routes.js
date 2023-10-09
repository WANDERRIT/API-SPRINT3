import express from "express";
import order from "./controllers/order.js";
import employee from "./controllers/employee.js";
import auth from "./middleware/auth.js"

const routes = express.Router();

//Rotas do funcionarios
routes.get("/employee", employee.findAll);
routes.get("/employee/:id", auth, employee.getbyId)
routes.post("/employee", employee.addEmployee);
routes.post("/auth", employee.login)


//rotas dos pedidos
routes.get("/order", order.findAll);
routes.post("/order", order.addOrder);
routes.get("/order/:id", order.findOrder);
routes.put("/order/:id", order.updateOrder);
routes.delete("/order/:id", order.deleteOrder);

export { routes as default };
