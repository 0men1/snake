import { SnakeEngine } from "@shared/engines/SnakeEngine";
import { Direction, GameState, Position } from "@shared/types";



export class SoloSnakeGame extends SnakeEngine {
    protected state: GameState;

    constructor(boardSize: number = 20) {
        super(boardSize)
        this.state = this.getInitialState();
    }

    private getInitialState(): GameState {
        return {
            snake: [{ x: 10, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 10 }],
            food: this.generateFood(),
            direction: Direction.RIGHT,
            score: 0,
            isGameOver: false
        }
    }

    private isPositionOccupied(position: Position): boolean {
        if (this.state) {
            return this.state.snake.some(segment => segment.x === position.x && segment.y === position.y)
        }
        return false
    }

    private generateFood(): Position {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * (this.boardSize)),
                y: Math.floor(Math.random() * (this.boardSize))
            }
        } while (this.isPositionOccupied(newFood))

        return newFood;
    }

    update() {
        const head = this.state.snake[0];
        const newHead = { ...head };

        if (this.checkCollision()) {
            this.state.isGameOver = true;
            return;
        }

        switch (this.state.direction) {
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

        this.state.snake.unshift(newHead);

        if (this.hasEatenFood(newHead)) {
            this.state.score++;
            this.state.food = this.generateFood();
        } else {
            this.state.snake.pop();
        }
    }


    override changeDirection(newDirection: Direction) {
        const opposites = {
            [Direction.UP]: Direction.DOWN,
            [Direction.DOWN]: Direction.UP,
            [Direction.LEFT]: Direction.RIGHT,
            [Direction.RIGHT]: Direction.LEFT
        };

        if (opposites[newDirection] !== this.state.direction) {
            this.state.direction = newDirection;
        }
    }


    private hasEatenFood(head: Position): boolean {
        return head.x === this.state.food.x && head.y == this.state.food.y
    }

    private checkCollision(): boolean {
        return this.checkBoundaryCollision(this.state.snake[0])
    }

    getState(): GameState {
        return { ...this.state }
    }

    reset() {
        this.state = this.getInitialState();
    }
}