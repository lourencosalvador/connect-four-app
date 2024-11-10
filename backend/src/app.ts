import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, {});

export { io };

export default () => {
  return httpServer;
};
