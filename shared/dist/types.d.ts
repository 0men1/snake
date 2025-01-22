export declare enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}
export type GameMode = 'solo' | 'local' | 'online';
export interface Position {
    x: number;
    y: number;
}
export interface GameState {
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
    gameMode: GameMode;
}
