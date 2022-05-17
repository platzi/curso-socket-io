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

    test("Test event", done => {

        clientSocket.on("greeting", greet => {
            try {
                expect(greet).toBe("Holi");
                done();
            } catch (error) {
                done(error);
            }
        });

        serverSocket.emit("greeting", "Holi");

    });

    test("Testing callbacks (acknoledgements)", done => {

        serverSocket.on("bark", callback => {
            callback("woof!");
        });

        clientSocket.emit("bark", arg => {
            try {
                expect(arg).toBe("woof!");
                done();
            } catch (error) {
                done(error);
            }
        });

    });

});