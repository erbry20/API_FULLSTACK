//src/server.ts
import express from "express";
import router from "./router";
import  db  from "./config/db";

const Server = express();

Server.use(express.json()); // 🧠 importante

Server.use('/api/products', router);
Server.use('/api/clients', router);

//conenctar a base de datos

async function connectDB() {
    try {
        await db.authenticate();
        console.log("Conectado a la base de datos");
        
        await db.sync({ alter: true });  // <-- Esto sincroniza los modelos con la BD
        console.log("Modelos sincronizados con la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
}

connectDB();

export default Server;
