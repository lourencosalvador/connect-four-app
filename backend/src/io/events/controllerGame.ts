import { io } from "../../core/app";
import { v4 as uuidV4 } from "uuid";

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("createGame", () => {
    const gameId = uuidV4();

    socket.join(gameId);
    socket.emit("notification", `You created a new game with id ${gameId}`);

    console.log(gameId);

    io.to(gameId).emit("gameCreated", gameId);
  });

  socket.on("joinGame", (gameId) => {
    socket.join(gameId);
    socket.emit("notification", `You join on room ${gameId}`);
  });

  socket.on("playMove", ({ gameId, position, player }) => {
    /* 
       [] - gama validations 
       [*] - Emit our user in room 
     */
    io.to(gameId).emit("movePlayed", { position, player });
  });

  socket.on("gameWon", ({ gameId, winner }) => {
    io.to(gameId).emit("gameEnded", { winner });
  });

  socket.on("restartGame", (gameId) => {
    io.to(gameId).emit("gameRestarted");
  });

  socket.on("sendMessage", ({ gameId, message, player }) => {
    /* 
       [] - gama validations 
       [*] - Emit our user in room 
     */
    io.to(gameId).emit("receiveMessage", { message, player });
  });
});
