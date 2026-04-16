import mongoose from "mongoose";

const conectarBD = async () => {
  const nombreDB = process.env.MONGO_DB_NAME
  const user = process.env.MONGO_DB_USER
  const password = process.env.MONGO_DB_PASS
  try{
    await mongoose.connect(`mongodb+srv://${user}}:${password}@${nombreDB}.e98wusg.mongodb.net/?appName=${nombreDB}`)
    console.log("la base de datos se conectó con éxito")
  } catch (e){
    console.log("Error al conectar la base de datos")
    process.exit(1);
  }
}

export { conectarBD }