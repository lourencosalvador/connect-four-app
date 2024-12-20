import express from "express";
import "express-async-errors";

import morgan from "morgan";
import cors from "cors";
import routes from "../http/routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/swagger.json";

import { errorHandler } from "../http/middlewares";
import { createServer } from "http";

import { Server } from "socket.io";
import { v4 as uuidV4 } from "uuid";

import { prisma } from "../http/config/@clientPrisma";

const app = express();

app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET, POST",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("createGame", async ({ name, avatar, player }) => {
    if (!name || !avatar || !player) {
      return socket.emit(
        "notification",
        "Error: Missing data for game creation."
      );
    }

    const existingPlayer = await prisma.player.findFirst({
      where: { name: name },
    });

    if (existingPlayer) {
      socket.emit(
        "notification",
        "Error: Name already in use. Choose a different name."
      );
    } else {
      const gameId = uuidV4();

      socket.join(gameId);
      socket.emit("notification", `You created a new game with id ${gameId}`);

      const playerRoom = { gameId, name, avatar, player };

      console.log(playerRoom);
      await prisma.player.create({ data: playerRoom });

      io.to(gameId).emit("gameCreated", gameId);
    }
  });

  socket.on("joinGame", async ({ gameId, name, avatar, player }) => {
    if (!gameId || !name || !avatar || !player) {
      return socket.emit(
        "notification",
        "Error: Missing data for joining game."
      );
    }
    if (gameId || name || avatar || player) {
      const existingPlayer = await prisma.player.findFirst({
        where: {
          name: name,
          gameId: gameId,
        },
      });

      if (existingPlayer) {
        socket.emit(
          "notification",
          `Error: Name already in use in room ${gameId}`
        );
      } else {
        socket.join(gameId);
        socket.emit("notification", `You joined room ${gameId}`);
        await prisma.player.create({
          data: {
            name,
            gameId,
            player,
            avatar,
          },
        });
        io.to(gameId).emit("joinedGame", `User joined room ${gameId}`);
      }
    } else {
      socket.emit("notification", `Error: Missing data`);
    }
  });

  socket.on("playMove", ({ gameId, position, player }) => {
    if (!gameId || !position || !player) {
      return socket.emit("notification", "Error: Missing data for move.");
    }
    io.to(gameId).emit("movePlayed", { position, player });
  });

  socket.on("gameWon", ({ gameId, winner }) => {
    io.to(gameId).emit("gameEnded", { winner });
  });

  socket.on("restartGame", (gameId) => {
    io.to(gameId).emit("gameRestarted");
  });

  socket.on("playersRoom", async (gameId) => {
    const playerInRoom = await prisma.player.findMany({ where: { gameId } });

    io.to(gameId).emit("playersRoom", playerInRoom);
  });

  socket.on("sendMessage", ({ gameId, message, player }) => {
    io.to(gameId).emit("receiveMessage", { message, player });
  });
});

export { io };

export default () => {
  return httpServer;
};
