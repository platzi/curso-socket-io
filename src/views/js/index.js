const socket = io();

const send = document.querySelector("#send");
const disconnect = document.querySelector("#disconnect");
const reconnect = document.querySelector("#reconnect");

send.addEventListener("click", () => {

    if(socket.connected)
        socket.emit("is connected", "¡Está conectado!");

});

disconnect.addEventListener("click", () => {
    socket.disconnect();
});

reconnect.addEventListener("click", () => {
    socket.connect();
});