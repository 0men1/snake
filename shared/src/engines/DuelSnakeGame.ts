import { SnakeEngine } from "./SnakeEngine";
import { Direction, DuelGameState, Position } from "../types";


export class DuelSnakeGame extends SnakeEngine {
    protected state: DuelGameState
    private SNAKE_LENGTH: number;

    constructor(boardSize: number = 20, winScore: number = 50) {
        super(boardSize)
        this.SNAKE_LENGTH = 3;
        this.state = this.getInitialState(winScore)
    }

    private getInitialState(winScore: number): DuelGameState {
        const player1Snake = this.createInitialSnake(5, 10, Direction.RIGHT);
        const player2Snake = this.createInitialSnake(15, 10, Direction.LEFT);
        
        this.state = {
            players: [
                {
                    snake: player1Snake,
                    direction: Direction.RIGHT,
                    food: {x: 0, y: 0},
                    score: 0,
                    isAlive: true
                },
                {
                    snake: player2Snake,
                    direction: Direction.LEFT,
                    food: {x: 0, y: 0},
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

    private createInitialSnake(x: number, y: number, direction: Direction): Position[] {
        const snake: Position[] = [];
        for (let i = 0; i < this.SNAKE_LENGTH; ++i) {
            snake.push({
                x: x - (direction === Direction.RIGHT ? i : -i),
                y
            });
        }
        return snake;
    }

    private generateFood(playerIndex: number): Position {
        const snake = this.state.players[playerIndex].snake[0]
        let newFood: Position;
        do {
            const radius = 5;
            const minX = Math.max(0, snake.x - radius);
            const maxX = Math.min(this.boardSize - 1, snake.x + radius);
            const minY = Math.max(0, snake.y - radius)
            const maxY = Math.min(this.boardSize - 1, snake.y + radius)

            newFood = {
                x: minX + Math.floor(Math.random() * (maxX - minX)),
                y: minY + Math.floor(Math.random() * (maxY - minY))
            };
        } while (this.isPositionOccupied(newFood))
        return newFood;
    }

    private isPositionOccupied(p: Position): boolean {
        return this.state.players.some(player =>
            player.snake.some(segment =>
                segment.x === p.x && segment.y === p.y
            )
        )
    }

    override update(): void {
        if (this.state.isGameOver) return;

        this.state.players.forEach((player, index) => {
            if (!player.isAlive) return;

            const head = player.snake[0]
            const newHead = { ...head }

            switch (player.direction) {
                case Direction.UP:
                    newHead.y -= 1;
                    break;
                case Direction.DOWN:
                    newHead.y += 1;
                    break;
                case Direction.LEFT:
                    newHead.x -= 1;
                    break;
                case Direction.RIGHT:
                    newHead.x += 1;
                    break;
            }

            if (this.checkCollision(newHead, index)) {
                player.isAlive = false;
                this.state.winner = index === 1 ? 0 : 1;
                this.state.isGameOver = true;
                return;
            }

            player.snake.unshift(newHead)
            player.snake.pop()
            if (this.hasEatenFood(newHead, player.food)) {
                player.score++;
                player.food = this.generateFood(index)
                this.checkWinByScore()
            }
        })
    }

    private checkCollision(newHead: Position, playerIndex: number): boolean {
        if (this.checkBoundaryCollision(newHead)) return true;

        const otherPlayerIndex = playerIndex === 0 ? 1 : 0;
        const otherPlayer = this.state.players[otherPlayerIndex]

        if (otherPlayer.snake.some(segment =>
            segment.x === newHead.x && segment.y === newHead.y
        )) {
            if (this.state.players[playerIndex].score <= otherPlayer.score) {
                return true;
            } else {
                otherPlayer.isAlive = false;
            }
        }
        return false;
    }


    private hasEatenFood(head: Position, food: Position): boolean {
        return food.x === head.x && food.y === head.y;
    }

    private checkWinByScore(): void {
        const alivePlayers = this.state.players.filter(p => p.isAlive)

        if (alivePlayers.length === 1) {
            this.state.isGameOver = true;
            this.state.winner = this.state.players.findIndex(p => p.isAlive)
        }
    }

    override changeDirection(newDirection: Direction, playerIndex: number): void {
        const player = this.state.players[playerIndex];

        const opposites = {
            [Direction.UP]: Direction.DOWN,
            [Direction.DOWN]: Direction.UP,
            [Direction.LEFT]: Direction.RIGHT,
            [Direction.RIGHT]: Direction.LEFT
        }

        if (opposites[newDirection] !== player.direction) {
            player.direction = newDirection;
        }
    }

    override getState() {
        return { ...this.state }
    }

    override reset(): void {
        this.state = this.getInitialState(this.state.winScore);
    }
}