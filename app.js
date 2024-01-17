import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET", "POST"],
        credentials: true,
    }
});

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST"],
    credentials: true,
}));

app.get("/", (req, res)=>{
    res.send("Hola parece que esta funcionando");
});

io.on("connection", (socket)=>{
    console.log("Usuario conectado", socket.id);
    
    /*
    //Esto es para mostrarle al cliente un mensaje cuando se conecte
    socket.emit("welcome",`Bienvenido al servidor`);
    //Esto sirve para que el cliente pueda ver cuando otros clientes se unen al servidor
    socket.broadcast.emit("welcome",`${socket.id} se unio al servidor`);
    */

    socket.on("message", (data)=>{
        console.log(data);
        io.emit("receive-message", data);
    });

    socket.on("disconnect", ()=>{
        console.log("Usuario desconectado", socket.id);
    })
});

server.listen(port, () => {    
    console.log(`El servidor esta corriendo en: http://localhost:${port}`);    
} )