import express from "express";
import routes from "./routes.js";
import db from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());



app.use(express.json());
app.use('/api',routes);



db.sync({alter:false });
console.log(`Banco de dados conectado: ${process.env.DB_NAME}`)

// app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
