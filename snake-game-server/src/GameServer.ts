import { WebSocketServer } from "ws";
import { Game } from "./types";

export class GameServer {
    private wss: WebSocketServer;
    private waitingPlayers: WebSocket[] = [];
    private activeGames = new Map<number, Game>();

    constructor() {
        this.wss = new WebSocketServer({ port: 8080 }, () => {
            console.log("Server activated: waiting for clients")
        });
        this.wss.on('connection', (socket: WebSocket) => {
            console.log("Client detected");
            this.handleNewPlayer(socket)

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    switch (data.type) {
                        case "NEW_GAME":
                            console.log("New Game")
                            break
                        case "MOVE":
                            console.log("Move")
                            break
                    }
                } catch (error) {
                    console.error("Invalid message format")
                }
            }
        })
    }

    private handleNewGame(socket: WebSocket[], data: any) {
        
    }

    private handleMove(socket: WebSocket, data: any) {}

    private handleNewPlayer(socket: WebSocket) {
        if (this.waitingPlayers.length === 0) {
            this.waitingPlayers.push(socket);
            socket.send(JSON.stringify({ type: "WAITING" }))
        } else {
            const opp = this.waitingPlayers.pop();
            // this.createGame(socket, opp!)
        }
    }
}