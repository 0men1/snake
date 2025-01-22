import { SnakeEngine } from "./SnakeEngine";
import { Direction, GameState, Position, GameMode } from "../types";
export declare class SnakeGame extends SnakeEngine {
    protected state: GameState;
    private SNAKE_LENGTH;
    constructor(boardSize: number | undefined, winScore: number | undefined, gameMode: GameMode);
    private getInitialState;
    private createInitialSnake;
    private generateFood;
    private isPositionOccupied;
    update(): void;
    private checkCollision;
    private hasEatenFood;
    private checkWinByScore;
    changeDirection(newDirection: Direction, playerIndex: number): void;
    getState(): {
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
    };
    reset(): void;
}
