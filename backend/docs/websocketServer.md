

# WebSocket API Documentation

Esta documentação detalha os eventos WebSocket disponíveis no backend para o jogo, incluindo os dados esperados para envio e os dados que o frontend pode esperar receber em resposta.

---

## Eventos WebSocket

### 1. Evento `createGame`

- **Descrição**: Cria um novo jogo e adiciona o jogador inicial na sala.
- **Tipo**: Emissão e Recebimento

#### Enviar (do frontend para o backend)

Evento: `createGame`

**Dados esperados**:
```json
{
  "name": "Nome do jogador",
  "avatar": "URL do avatar do jogador",
  "player": "Identificação do jogador (ex: 'X' ou 'O')"
}
```

| Campo   | Tipo   | Descrição                          |
| ------- | ------ | ---------------------------------- |
| name    | String | Nome do jogador                    |
| avatar  | String | URL para a imagem de avatar        |
| player  | String | Identificação do jogador, exemplo: "X" ou "O" |

#### Receber (do backend para o frontend)

**Eventos de Resposta**:

1. Evento: `notification`
   - **Descrição**: Notifica o jogador que um novo jogo foi criado.
   - **Dados**:
     ```json
     "You created a new game with id <gameId>"
     ```
   - **Exemplo**:
     ```json
     "You created a new game with id 123e4567-e89b-12d3-a456-426614174000"
     ```

2. Evento: `gameCreated`
   - **Descrição**: Notifica que o jogo foi criado com sucesso e fornece o `gameId`.
   - **Dados**:
     ```json
     "<gameId>"
     ```
   - **Exemplo**:
     ```json
     "123e4567-e89b-12d3-a456-426614174000"
     ```

---

### 2. Evento `playerRoom`

- **Descrição**: Busca todos os jogadores presentes em uma sala específica.
- **Tipo**: Emissão e Recebimento

#### Enviar (do frontend para o backend)

Evento: `playerRoom`

**Dados esperados**:
```json
"<gameId>"
```

| Campo   | Tipo   | Descrição                          |
| ------- | ------ | ---------------------------------- |
| gameId  | String | ID do jogo para buscar os jogadores na sala |

#### Receber (do backend para o frontend)

Evento: `playersRoom`

**Descrição**: Retorna uma lista de jogadores presentes na sala do jogo especificada.

**Dados**:
```json
[
  {
    "gameId": "<gameId>",
    "name": "Nome do jogador",
    "avatar": "URL do avatar do jogador",
    "player": "Identificação do jogador"
  }
]
```

| Campo   | Tipo   | Descrição                          |
| ------- | ------ | ---------------------------------- |
| gameId  | String | ID do jogo                         |
| name    | String | Nome do jogador                    |
| avatar  | String | URL para a imagem de avatar        |
| player  | String | Identificação do jogador, exemplo: "X" ou "O" |

---

### Exemplo de Fluxo de Dados

1. **Criação do Jogo**:
   - O frontend envia `createGame` com `name`, `avatar`, e `player`.
   - O backend responde com `notification` e `gameCreated`, fornecendo o `gameId`.

2. **Busca de Jogadores na Sala**:
   - O frontend envia `playerRoom` com o `gameId`.
   - O backend responde com `playersRoom`, retornando uma lista dos jogadores na sala especificada.

---

### Notas

- Certifique-se de que o `gameId` seja único para cada jogo criado.
- Use o evento `notification` para exibir mensagens de confirmação no frontend.
- No evento `playersRoom`, a lista será vazia se nenhum jogador estiver na sala.

---
