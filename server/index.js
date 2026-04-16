import express from "express";
import 'dotenv/config';
import { conectarBD } from "./src/config/db.js"; 
import { authRouter } from "./src/routes/auth.router.v1.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";

const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";

app.use(express.json());

//Rutas públicas
app.use("/v1", authRouter)

  
//Rutas privadas
app.use(authMiddleware)

//Conectar a la base de datos
conectarBD();

//Inicializar el servidor

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
