import { WebSocketServer } from "ws";
import { Game } from "./types";
import { DuelSnakeGame } from "@shared/engines/DuelSnakeGame";
import { createServer } from "http";

export class GameServer {
    private wss: WebSocketServer;
    private waitingPlayers: WebSocket[] = [];
    private activeGames = new Map<number, Game>();
    private currID: number = 0;

    constructor() {
        const server = createServer();
        this.wss = new WebSocketServer({ server, path: process.env.path }, () => {
            console.log("Server activated: waiting for clients")
        });

        this.wss.on('connection', (socket: WebSocket) => {
            console.log("Client detected");
            this.handleNewPlayer(socket)
        })
    }

    private handleNewPlayer(socket: WebSocket) {
        if (this.waitingPlayers.length === 0) {
            this.waitingPlayers.push(socket);
            socket.send(JSON.stringify({ type: "WAITING" }))
        } else {
            const opp = this.waitingPlayers.pop();
            this.createGame(socket, opp!)
        }
    }

    private handleDisconnect() { }

    private createGame(player1: WebSocket, player2: WebSocket) {
        const gameId = this.currID++;
        const gameRoom = {
            game: new DuelSnakeGame(),
            players: [player1, player2]
        };
        this.activeGames.set(gameId, gameRoom);
        this.activeGames.get(gameId)?.players.forEach((player, index) => {
            player.send(JSON.stringify({
                type: "GAME_START",
                playerId: index,
                gameId
            }))
        })
    }

    private broadcastGameState() { }
    checkCollision() { }
    validateMove() { }
}