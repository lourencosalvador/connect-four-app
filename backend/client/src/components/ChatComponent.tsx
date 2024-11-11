import React, { useEffect, useState } from "react";
import { sendMessage, onReceiveMessage } from "../service/socket";

interface Message {
  message: string;
  player: string;
}

interface ChatComponentProps {
  gameId: string | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ gameId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [player, setPlayer] = useState<string>("Player1");

  useEffect(() => {
    onReceiveMessage((msg: Message) => setMessages((prev) => [...prev, msg]));

    return () => {
      // Cleanup listeners if needed
    };
  }, []);

  const handleSendMessage = () => {
    if (gameId && message) {
      sendMessage(gameId, message, player);
      setMessage("");
    } else {
      alert("Join a game first and enter a message!");
    }
  };

  return (
    <div>
      <h3>Chat</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{`${msg.player}: ${msg.message}`}</li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
