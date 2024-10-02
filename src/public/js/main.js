//creamos una isntancia socket.io del lado del cliente:
const socket = io();


let user ;
//utilizmos sweet alert para el mensaje de bienvenida

//swal es un objeto global que nos permite acceder a todos los metodos de la libreria
//fire es un metodo que nos permite configuarar el alerta
Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa un usuario para identificarte en el chat",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    }
}).then( (result) => { 
    user = result.value;
    
 })

 const chatBox = document.getElementById("chatBox");
 
 chatBox.addEventListener("keyup", (event) => { 
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            //trim nos permite sacar los espacios en blanco del principio y del final de un string
            //si el mensjae tiene mas de 0 caracteres, mandamos al servidor
            socket.emit("message", {user:user, message:chatBox.value});
            chatBox.value = "";
        }
    }
  })
//listener de mensajes
socket.on("messagesLogs", data => {
    const log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach((message) => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    });
    log.innerHTML = messages;
})
