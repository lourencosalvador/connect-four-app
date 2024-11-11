import React from "react";
import GameComponent from "./components/GameComponent";
import ChatComponent from "./components/ChatComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Multiplayer Game</h1>
      <GameComponent />
      <ChatComponent gameId={null} />
    </div>
  );
};

export default App;
