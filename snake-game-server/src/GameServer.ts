import { WebSocketServer } from "ws";
import { Game } from "./types";
import { DuelSnakeGame } from "@shared/engines/DuelSnakeGame";

export class GameServer {
    private wss: WebSocketServer;
    private waitingPlayers: WebSocket[] = [];
    private activeGames = new Map<number, Game>();
    private currID: number = 0;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port }, () => {
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

    private createGame(player1: WebSocket, player2: WebSocket) {
        const gameId = this.currID++;
        const gameRoom = {
            game: new DuelSnakeGame()
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
}