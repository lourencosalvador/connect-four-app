
# Documentação de Eventos WebSocket para Jogo Multiplayer

Este documento descreve os eventos WebSocket para a criação e gestão de um jogo multiplayer, incluindo funcionalidades de chat e movimentação de peças. Além disso, são fornecidos exemplos de como o frontend pode consumir esses eventos.

## Índice

1. [Conexão WebSocket](#conexão-websocket)
2. [Eventos do Jogo](#eventos-do-jogo)
   - [createGame](#creategame)
   - [joinGame](#joingame)
   - [playMove](#playmove)
   - [gameWon](#gamewon)
   - [restartGame](#restartgame)
3. [Chat](#chat)
   - [sendMessage](#sendmessage)
4. [Eventos Emitidos para o Cliente](#eventos-emitidos-para-o-cliente)

---

## Conexão WebSocket

### `connection`
- **Descrição**: O evento `connection` é disparado quando um cliente se conecta ao servidor WebSocket. O servidor estabelece uma comunicação bidirecional com o cliente.
  
### Exemplo de Frontend (React)

```javascript
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // URL do servidor WebSocket

useEffect(() => {
  socket.on('connect', () => {
    console.log('Conectado ao servidor WebSocket!');
  });

  // Limpeza ao desmontar o componente
  return () => socket.disconnect();
}, []);
```

---

## Eventos do Jogo

### `createGame`
- **Descrição**: Disparado quando um jogador cria um novo jogo.
- **Emissão no Servidor**: O servidor cria um ID de jogo aleatório e informa todos os jogadores que o jogo foi criado.
- **Emissão no Cliente**: Um evento de notificação é enviado ao criador do jogo com o ID do jogo.
  
#### Exemplo de Emissão no Servidor

```javascript
socket.on("createGame", () => {
  const gameId = Math.random().toString(36).substr(2, 9); // Gera um ID de jogo aleatório
  socket.join(gameId); // O jogador entra na sala do jogo
  socket.emit("notification", `You created a new game with id ${gameId}`); // Notifica o criador
  io.to(gameId).emit("gameCreated", gameId); // Informa a todos na sala sobre o jogo criado
});
```

#### Exemplo de Frontend (React)

```javascript
const createGame = () => {
  socket.emit('createGame');
};

// Escutar a notificação quando o jogo é criado
socket.on('notification', (message) => {
  alert(message);
});
```

---

### `joinGame`
- **Descrição**: Disparado quando um jogador entra em um jogo já existente.
- **Emissão no Servidor**: O servidor adiciona o jogador à sala do jogo.
- **Emissão no Cliente**: O jogador é notificado de que entrou no jogo.

#### Exemplo de Emissão no Servidor

```javascript
socket.on("joinGame", (gameId) => {
  socket.join(gameId); // Adiciona o jogador à sala do jogo
  socket.emit("notification", `You joined the game with id ${gameId}`); // Notifica o jogador
});
```

#### Exemplo de Frontend (React)

```javascript
const joinGame = (gameId) => {
  socket.emit('joinGame', gameId);
};

// Escutar a notificação quando o jogador entra no jogo
socket.on('notification', (message) => {
  alert(message);
});
```

---

### `playMove`
- **Descrição**: Disparado quando um jogador faz um movimento no tabuleiro.
- **Emissão no Servidor**: O servidor emite o movimento para todos os jogadores na sala, para atualizar o estado do jogo.
- **Emissão no Cliente**: O movimento do jogador é mostrado no tabuleiro para todos os participantes.

#### Exemplo de Emissão no Servidor

```javascript
socket.on("playMove", ({ gameId, position, player }) => {
  io.to(gameId).emit("movePlayed", { position, player }); // Emite a jogada para todos na sala
});
```

#### Exemplo de Frontend (React)

```javascript
const playMove = (gameId, position, player) => {
  socket.emit('playMove', { gameId, position, player });
};

// Escutar a jogada e atualizar o tabuleiro
socket.on('movePlayed', ({ position, player }) => {
  // Atualiza o estado do tabuleiro com a nova jogada
});
```

---

### `gameWon`
- **Descrição**: Disparado quando um jogador ganha o jogo.
- **Emissão no Servidor**: O servidor notifica todos os jogadores que o jogo acabou e quem venceu.
- **Emissão no Cliente**: O cliente exibe o vencedor do jogo.

#### Exemplo de Emissão no Servidor

```javascript
socket.on("gameWon", ({ gameId, winner }) => {
  io.to(gameId).emit("gameEnded", { winner }); // Notifica todos os jogadores sobre o vencedor
});
```

#### Exemplo de Frontend (React)

```javascript
// Escutar quando o jogo terminar
socket.on('gameEnded', ({ winner }) => {
  alert(`The winner is: ${winner}`);
});
```

---

### `restartGame`
- **Descrição**: Disparado quando o jogo é reiniciado.
- **Emissão no Servidor**: O servidor reinicia o jogo para todos os jogadores na sala.
- **Emissão no Cliente**: Todos os jogadores recebem a notificação de que o jogo foi reiniciado.

#### Exemplo de Emissão no Servidor

```javascript
socket.on("restartGame", (gameId) => {
  io.to(gameId).emit("gameRestarted"); // Reinicia o jogo para todos os jogadores na sala
});
```

#### Exemplo de Frontend (React)

```javascript
const restartGame = (gameId) => {
  socket.emit('restartGame', gameId);
};

// Escutar quando o jogo for reiniciado
socket.on('gameRestarted', () => {
  // Lógica para reiniciar o tabuleiro e o estado do jogo
});
```

---

## Chat

### `sendMessage`
- **Descrição**: Disparado quando um jogador envia uma mensagem no chat.
- **Emissão no Servidor**: O servidor envia a mensagem para todos os jogadores na sala.
- **Emissão no Cliente**: A mensagem é exibida para todos os jogadores na sala de jogo.

#### Exemplo de Emissão no Servidor

```javascript
socket.on("sendMessage", ({ gameId, message, player }) => {
  io.to(gameId).emit("receiveMessage", { message, player }); // Envia a mensagem para todos os jogadores
});
```

#### Exemplo de Frontend (React)

```javascript
const sendMessage = (gameId, message, player) => {
  socket.emit('sendMessage', { gameId, message, player });
};

// Escutar as mensagens recebidas no chat
socket.on('receiveMessage', ({ message, player }) => {
  console.log(`${player}: ${message}`);
});
```

---

## Eventos Emitidos para o Cliente

### `notification`
- **Descrição**: Envia uma notificação para o jogador sobre eventos como a criação de um jogo ou a entrada em um jogo.

### `gameCreated`
- **Descrição**: Notifica todos os jogadores na sala sobre a criação de um novo jogo.

### `movePlayed`
- **Descrição**: Notifica todos os jogadores sobre o movimento realizado no jogo.

### `gameEnded`
- **Descrição**: Notifica todos os jogadores sobre o fim do jogo e o vencedor.

### `gameRestarted`
- **Descrição**: Notifica todos os jogadores sobre a reinicialização do jogo.

### `receiveMessage`
- **Descrição**: Envia a mensagem do chat para todos os jogadores na sala.

---
