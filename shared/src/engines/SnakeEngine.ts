import { Direction, DuelGameState, GameState, Position } from "../types";

export abstract class SnakeEngine {
    protected boardSize: number;
    protected abstract state: DuelGameState | GameState;

    constructor(boardSize: number) {
        this.boardSize = boardSize
    }

    abstract update(): void
    abstract changeDirection(direction: Direction, playerIndex?: number): void;
    abstract getState(): DuelGameState | GameState;
    abstract reset(): void;

    protected checkBoundaryCollision(position: Position): boolean {
        return (position.x < 0 || position.y < 0) ||
            (position.x > this.boardSize - 1 || position.y > this.boardSize - 1);
    }
}