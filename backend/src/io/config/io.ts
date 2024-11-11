import { Server } from "socket.io";
import httpServer from "../../core/app";

const io = new Server(httpServer(), {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export { io };
