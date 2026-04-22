import mongoose from "mongoose";

const conectarBD = async () => {
  const nombreDB = process.env.MONGO_DB_NAME
  const user = process.env.MONGO_DB_USER
  const password = encodeURIComponent(process.env.MONGO_DB_PASS)
  try{
    await mongoose.connect(`mongodb://ObliFullStack:${password}@ac-gcnmda3-shard-00-00.e98wusg.mongodb.net:27017,ac-gcnmda3-shard-00-01.e98wusg.mongodb.net:27017,ac-gcnmda3-shard-00-02.e98wusg.mongodb.net:27017/?ssl=true&replicaSet=atlas-1kkojz-shard-0&authSource=admin&appName=ObliFullStack2026`)
    console.log("la base de datos se conectó con éxito")
  } catch (e){
    console.log("Error al conectar la base de datos", e.message)
    process.exit(1);
  }
}

export { conectarBD }