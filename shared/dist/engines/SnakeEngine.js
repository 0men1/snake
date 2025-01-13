"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeEngine = void 0;
class SnakeEngine {
    constructor(boardSize) {
        this.boardSize = boardSize;
    }
    checkBoundaryCollision(position) {
        return (position.x < 0 || position.y < 0) ||
            (position.x > this.boardSize - 1 || position.y > this.boardSize - 1);
    }
}
exports.SnakeEngine = SnakeEngine;
