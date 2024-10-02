/** chat comunitario usando websockets y express handlebars**/
import express from "express";
import {engine} from "express-handlebars";
import viewRouter from "./routes/view.router.js";
import {Server} from "socket.io";
const app = express();
const PUERTO = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'));

//express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//rutas
app.use("/", viewRouter);

//listen:
const httpServer = app.listen(PUERTO, () => console.log(`Servidor escuchando en el puerto ${PUERTO}`));
//generamos una instancia de socket.io del lado del backend
const io = new Server(httpServer);

//array donde guardamos los usuarios y mensajes
let messages = [];
// establecemos conexion:
io.on("connection", (socket) => {
    console.log("Un cliente conectado"); 
    socket.on("message", data => {
        messages.push(data);

        //emitir mensaje al front
        socket.emit("messagesLogs", messages);
    })
});

