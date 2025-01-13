"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuelSnakeGame = void 0;
const SnakeEngine_1 = require("./SnakeEngine");
const types_1 = require("../types");
class DuelSnakeGame extends SnakeEngine_1.SnakeEngine {
    constructor(boardSize = 20, winScore = 50) {
        super(boardSize);
        this.SNAKE_LENGTH = 3;
        this.state = this.getInitialState(winScore);
    }
    getInitialState(winScore) {
        const player1Snake = this.createInitialSnake(5, 10, types_1.Direction.RIGHT);
        const player2Snake = this.createInitialSnake(15, 10, types_1.Direction.LEFT);
        this.state = {
            players: [
                {
                    snake: player1Snake,
                    direction: types_1.Direction.RIGHT,
                    food: { x: 0, y: 0 },
                    score: 0,
                    isAlive: true
                },
                {
                    snake: player2Snake,
                    direction: types_1.Direction.LEFT,
                    food: { x: 0, y: 0 },
                    score: 0,
                    isAlive: true
                }
            ],
            winScore,
            isGameOver: false
        };
        this.state.players[0].food = this.generateFood(0);
        this.state.players[1].food = this.generateFood(1);
        return this.state;
    }
    createInitialSnake(x, y, direction) {
        const snake = [];
        for (let i = 0; i < this.SNAKE_LENGTH; ++i) {
            snake.push({
                x: x - (direction === types_1.Direction.RIGHT ? i : -i),
                y
            });
        }
        return snake;
    }
    generateFood(playerIndex) {
        const snake = this.state.players[playerIndex].snake[0];
        let newFood;
        do {
            const radius = 5;
            const minX = Math.max(0, snake.x - radius);
            const maxX = Math.min(this.boardSize - 1, snake.x + radius);
            const minY = Math.max(0, snake.y - radius);
            const maxY = Math.min(this.boardSize - 1, snake.y + radius);
            newFood = {
                x: minX + Math.floor(Math.random() * (maxX - minX)),
                y: minY + Math.floor(Math.random() * (maxY - minY))
            };
        } while (this.isPositionOccupied(newFood));
        return newFood;
    }
    isPositionOccupied(p) {
        return this.state.players.some(player => player.snake.some(segment => segment.x === p.x && segment.y === p.y));
    }
    update() {
        if (this.state.isGameOver)
            return;
        this.state.players.forEach((player, index) => {
            if (!player.isAlive)
                return;
            const head = player.snake[0];
            const newHead = { ...head };
            switch (player.direction) {
                case types_1.Direction.UP:
                    newHead.y -= 1;
                    break;
                case types_1.Direction.DOWN:
                    newHead.y += 1;
                    break;
                case types_1.Direction.LEFT:
                    newHead.x -= 1;
                    break;
                case types_1.Direction.RIGHT:
                    newHead.x += 1;
                    break;
            }
            if (this.checkCollision(newHead, index)) {
                player.isAlive = false;
                this.state.winner = index === 1 ? 0 : 1;
                this.state.isGameOver = true;
                return;
            }
            player.snake.unshift(newHead);
            player.snake.pop();
            if (this.hasEatenFood(newHead, player.food)) {
                player.score++;
                player.food = this.generateFood(index);
                this.checkWinByScore();
            }
        });
    }
    checkCollision(newHead, playerIndex) {
        if (this.checkBoundaryCollision(newHead))
            return true;
        const otherPlayerIndex = playerIndex === 0 ? 1 : 0;
        const otherPlayer = this.state.players[otherPlayerIndex];
        if (otherPlayer.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            if (this.state.players[playerIndex].score <= otherPlayer.score) {
                return true;
            }
            else {
                otherPlayer.isAlive = false;
            }
        }
        return false;
    }
    hasEatenFood(head, food) {
        return food.x === head.x && food.y === head.y;
    }
    checkWinByScore() {
        const alivePlayers = this.state.players.filter(p => p.isAlive);
        if (alivePlayers.length === 1) {
            this.state.isGameOver = true;
            this.state.winner = this.state.players.findIndex(p => p.isAlive);
        }
    }
    changeDirection(newDirection, playerIndex) {
        const player = this.state.players[playerIndex];
        const opposites = {
            [types_1.Direction.UP]: types_1.Direction.DOWN,
            [types_1.Direction.DOWN]: types_1.Direction.UP,
            [types_1.Direction.LEFT]: types_1.Direction.RIGHT,
            [types_1.Direction.RIGHT]: types_1.Direction.LEFT
        };
        if (opposites[newDirection] !== player.direction) {
            player.direction = newDirection;
        }
    }
    getState() {
        return { ...this.state };
    }
    reset() {
        this.state = this.getInitialState(this.state.winScore);
    }
}
exports.DuelSnakeGame = DuelSnakeGame;
