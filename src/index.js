//process.env.DEBUG = "*";
process.env.DEBUG = "engine, socket.io:socket, socket.io:client";

const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use( express.static(path.join(__dirname, "views")) );

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

io.of("custom-namespace").on("connection", socket => {

    socket.on("circle position", position => {
        socket.broadcast.emit("move circle", position);
    });

});

httpServer.listen(3000);