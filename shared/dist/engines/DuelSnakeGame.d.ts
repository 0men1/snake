import { SnakeEngine } from "./SnakeEngine";
import { Direction, DuelGameState, Position } from "../types";
export declare class DuelSnakeGame extends SnakeEngine {
    protected state: DuelGameState;
    private SNAKE_LENGTH;
    constructor(boardSize?: number, winScore?: number);
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
    };
    reset(): void;
}
