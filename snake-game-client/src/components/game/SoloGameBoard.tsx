import { useRef, useEffect } from 'react';
import { GameState } from '@/../../shared/src/types';

interface SoloGameBoardProps {
    gameState: GameState;
}

interface Position {
    currentX: number;
    currentY: number;
    targetX: number;
    targetY: number;
}

const SoloGameBoard: React.FC<SoloGameBoardProps> = ({ gameState }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const patternRef = useRef<CanvasPattern | null>(null);
    const positionsRef = useRef<Position[]>([]);
    const animationFrameRef = useRef<number>(undefined);
    const lastTimeRef = useRef<number>(0);

    const CELL_SIZE = 30;
    const GRID_SIZE = 20;
    const CANVAS_SIZE = CELL_SIZE * GRID_SIZE;
    const INTERPOLATION_SPEED = 0.3;

    const renderFrame = (timestamp: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Calculate delta time for smooth interpolation
        const deltaTime = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 16.67 : 1;
        lastTimeRef.current = timestamp;

        // Clear and fill background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Apply cached pattern
        if (patternRef.current) {
            ctx.fillStyle = patternRef.current;
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }

        // Update positions
        let stillMoving = false;
        positionsRef.current.forEach((pos, i) => {
            // Calculate the distance to move this frame
            const dx = pos.targetX - pos.currentX;
            const dy = pos.targetY - pos.currentY;

            if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
                pos.currentX += dx * INTERPOLATION_SPEED * deltaTime;
                pos.currentY += dy * INTERPOLATION_SPEED * deltaTime;
                stillMoving = true;
            } else {
                pos.currentX = pos.targetX;
                pos.currentY = pos.targetY;
            }

            // Draw segment
            ctx.fillStyle = i === 0 ? '#3B82F6' : '#3B82F688';
            ctx.beginPath();
            ctx.roundRect( pos.currentX, pos.currentY, CELL_SIZE, CELL_SIZE, 4);
            ctx.fill();
        });

        // Draw food
        ctx.fillStyle = '#3882F6';
        ctx.beginPath();
        ctx.roundRect( gameState.players[0].food.x * CELL_SIZE, gameState.players[0].food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, 4);
        ctx.fill();

        // Continue animation if needed
        if (stillMoving && !gameState.isGameOver) {
            animationFrameRef.current = requestAnimationFrame(renderFrame);
        }
    };

    // Initialize or update target positions
    useEffect(() => {
        // Cancel any existing animation
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Create pattern once if it doesn't exist
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

        // Reset positions if snake length is 1 (new game)
        if (gameState.players[0].snake.length === 1) {
            positionsRef.current = [];
        }

        // Update target positions
        while (positionsRef.current.length < gameState.players[0].snake.length) {
            const segment = gameState.players[0].snake[positionsRef.current.length];
            const gridX = segment.x * CELL_SIZE;
            const gridY = segment.y * CELL_SIZE;
            positionsRef.current.push({ currentX: gridX, currentY: gridY, targetX: gridX, targetY: gridY });
        }

        // Update existing positions' targets
        gameState.players[0].snake.forEach((segment, i) => {
            const pos = positionsRef.current[i];
            pos.targetX = segment.x * CELL_SIZE;
            pos.targetY = segment.y * CELL_SIZE;
        });

        // Remove extra positions if snake is shorter
        positionsRef.current.length = gameState.players[0].snake.length;

        // Start animation
        lastTimeRef.current = 0;
        animationFrameRef.current = requestAnimationFrame(renderFrame);

        // Cleanup
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [gameState]);

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border border-gray-700 rounded-lg"
        />
    );
};

export default SoloGameBoard;
