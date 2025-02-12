import { SnakeGame } from "@shared/engines/SnakeGame"

export interface Position {
    x: number;
    y: number;
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}
export interface GameState {
    players: {
        snake: Position[],
        direction: Direction,
        score: number,
        isAlive: boolean,
    }[];
    food: Position[];
    isGameOver: boolean;
    winner?: number;
}

export interface Game {
    game: SnakeGame;
    players: WebSocket[]
}