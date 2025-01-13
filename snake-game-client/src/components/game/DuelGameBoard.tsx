import { DuelGameState } from "@/../../shared/src/types";
import React, { useEffect, useRef } from "react";

interface DuelGameBoardProps {
    gameState: DuelGameState
}

const DuelGameBoard: React.FC<DuelGameBoardProps> = ({ gameState }) => {
    const canvaseRef = useRef<HTMLCanvasElement>(null);
    const patternRef = useRef<CanvasPattern | null>(null);


    const CELL_SIZE = 30;
    const GRID_SIZE = 20;
    const CANVAS_SIZE = CELL_SIZE * GRID_SIZE;

    useEffect(() => {
        const canvas = canvaseRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')
        if (!ctx) return;

        if (!patternRef.current) {
            const patternCanvas = document.createElement('canvas');
            patternCanvas.width = CELL_SIZE;
            patternCanvas.height = CELL_SIZE;
            const patternCtx = patternCanvas.getContext('2d');
            if (!patternCtx) return;
            patternCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            patternCtx.strokeRect(0, 0, CELL_SIZE, CELL_SIZE);
            patternRef.current = ctx.createPattern(patternCanvas, 'repeat');
        }

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        if (patternRef.current) {
            ctx.fillStyle = patternRef.current;
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }

        gameState.players.forEach((player, index) => {
            const snakeColor = index === 0 ? '#3B82F6' : '#22C55E'; // Blue for P1, Green for P2
            player.snake.forEach((segment, i) => {
                ctx.fillStyle = i === 0 ? snakeColor : `${snakeColor}88`
                ctx.beginPath();
                ctx.roundRect(
                    segment.x * CELL_SIZE,
                    segment.y * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE,
                    4
                );
                ctx.fill();
            })

            // Draw the food
            ctx.fillStyle = index === 0 ? '#60A5FA' : '#4ADE80'

            ctx.beginPath();
            ctx.roundRect(
                player.food.x * CELL_SIZE,
                player.food.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE,
                4
            )
            ctx.fill();
        });
    }, [gameState])

    return (
        <div>
            <canvas
                ref={canvaseRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="border border-gray-700 rounded-lg"
            />
        </div>
    )
}


export default DuelGameBoard