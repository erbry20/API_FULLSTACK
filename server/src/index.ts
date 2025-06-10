//src/index.ts
import Server from './server';

// Iniciar el servidor en el puerto 3000
Server.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
    console.log("http://localhost:3000");
});

