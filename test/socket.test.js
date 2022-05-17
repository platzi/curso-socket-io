const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("Testing Socket.io", () => {

    let io, serverSocket, clientSocket;

    // Antes de empezar a hacer los test, creamos el servidor
    beforeAll(done => {

        const httpServer = createServer();
        io = new Server(httpServer);

        httpServer.listen(() => {

            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);

            io.on("connection", socket => {
                serverSocket = socket;
            });

            clientSocket.on("connect", done);

        });

    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

});