import { Direction, DuelGameState, GameState, Position } from "../types";
export declare abstract class SnakeEngine {
    protected boardSize: number;
    protected abstract state: DuelGameState | GameState;
    constructor(boardSize: number);
    abstract update(): void;
    abstract changeDirection(direction: Direction, playerIndex?: number): void;
    abstract getState(): DuelGameState | GameState;
    abstract reset(): void;
    protected checkBoundaryCollision(position: Position): boolean;
}
