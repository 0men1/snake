export declare enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}
export interface Position {
    x: number;
    y: number;
}
export interface GameState {
    snake: Position[];
    food: Position;
    direction: Direction;
    score: number;
    isGameOver: boolean;
}
export interface DuelGameState {
    players: {
        snake: Position[];
        food: Position;
        score: number;
        direction: Direction;
        isAlive: boolean;
    }[];
    winScore: number;
    isGameOver: boolean;
    winner?: number;
}
