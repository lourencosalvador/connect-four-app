import Express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const expressServer = Express();
const httpServer = createServer(expressServer);
const io = new Server(httpServer, {});

httpServer.listen(5000, () =>
  console.log("Socket server running on http://localhost:5000")
);

export { io };
