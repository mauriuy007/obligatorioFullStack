import express from "express";
import 'dotenv/config';
import { conectarBD } from "./src/config/db.js"; 
import { authRouter } from "./src/routes/auth.router.v1.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";
import { bookRouterV1 } from "./src/routes/book.router.v1.js"
import { adminAuthorizationMiddleware } from "./src/middleware/admin.middleware.js";
import { adminRouterV1 } from "./src/routes/admin.router.v1.js";

const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";

app.use(express.json());

//Rutas públicas
app.use("/v1", authRouter)
  
//Rutas privadas
app.use(authMiddleware)
app.use("/v1/books", bookRouterV1);
app.use("/v1/admin", adminAuthorizationMiddleware, adminRouterV1);
//app.use("/v2/reviews", reviewsMiddleware, reviewsRouterV1);

//Conectar a la base de datos
conectarBD();

//Inicializar el servidor

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
