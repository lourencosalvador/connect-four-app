import React, { useEffect, useState } from "react";
import {
  createGame,
  joinGame,
  playMove,
  restartGame,
  onGameCreated,
  onMovePlayed,
  onGameEnded,
  onGameRestarted,
  onNotification,
} from "../service/socket";

interface Move {
  position: string;
  player: string;
}

const GameComponent: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [moves, setMoves] = useState<Move[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    onGameCreated((id: string) => setGameId(id));
    onMovePlayed((move: Move) => setMoves((prevMoves) => [...prevMoves, move]));
    onGameEnded((result) => alert(`Game ended, winner: ${result.winner}`));
    onGameRestarted(() => setMoves([]));
    onNotification((msg: string) => setNotifications((prev) => [...prev, msg]));

    return () => {
      // Optionally, remove listeners here if needed
    };
  }, []);

  const handleCreateGame = () =>
    createGame({
      name: "none",
      avatar: "none",
      player: "none",
    });

  const handleJoinGame = () => {
    const id = prompt("Enter game ID to join:");
    if (id) joinGame(id);
  };

  const handlePlayMove = () => {
    if (!gameId) return alert("Create or join a game first!");
    const position = prompt("Enter position to play:");
    const player = prompt("Enter player symbol (X/O):");
    if (position && player) playMove(gameId, position, player);
  };

  const handleRestartGame = () => {
    if (gameId) restartGame(gameId);
  };

  return (
    <div>
      <h2>Game ID: {gameId}</h2>
      <button onClick={handleCreateGame}>Create Game</button>
      <button onClick={handleJoinGame}>Join Game</button>
      <button onClick={handlePlayMove}>Play Move</button>
      <button onClick={handleRestartGame}>Restart Game</button>
      <div>
        <h3>Moves:</h3>
        <ul>
          {moves.map((move, index) => (
            <li
              key={index}
            >{`Position: ${move.position}, Player: ${move.player}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Notifications:</h3>
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameComponent;
