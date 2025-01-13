'use client'

import { useEffect, useRef, useState } from 'react'
import { SoloSnakeGame } from '@/api/engines/SoloSnakeGame'
import { useGameLoop } from '@/lib/hooks/useGameLoop'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Direction } from '@shared/types'
import GameLoading from '@/components/loading/GameLoading'
import GameOver from '@/components/game/GameOver'
import SoloGameBoard from '@/components/game/SoloGameBoard'

export default function SinglePlayerGame() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const gameRef = useRef<SoloSnakeGame>(new SoloSnakeGame(20));
    const [gameState, setGameState] = useState(gameRef.current.getState());
    const inputQueueRef = useRef<Direction[]>([]);

    useEffect(() => {
        const initializeGame = async () => {
            try {
                await setupGameComponents();
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to initialize game:', error)
            }
        };
        initializeGame();
    }, [])


    useEffect(() => {
        if (isLoading) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.repeat) return; // Ignore held keys

            let newDirection: Direction | null = null;
            switch (e.code) {
                case "KeyS":
                case "ArrowDown":
                    newDirection = Direction.DOWN;
                    break;
                case "KeyW":
                case "ArrowUp":
                    newDirection = Direction.UP;
                    break;
                case "KeyA":
                case "ArrowLeft":
                    newDirection = Direction.LEFT;
                    break;
                case "KeyD":
                case "ArrowRight":
                    newDirection = Direction.RIGHT;
                    break;
            }

            if (newDirection !== null) {
                inputQueueRef.current.push(newDirection);
            }
        }

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isLoading]);

    useGameLoop(() => {
        if (!gameState.isGameOver && !isLoading) {
            if (inputQueueRef.current.length > 0) {
                gameRef.current.changeDirection(inputQueueRef.current.shift()!);
            }
            gameRef.current.update();
            setGameState(gameRef.current.getState());
        }
    }, 10); // Increased from 10 to 15 FPS

    const handleBackToMenu = () => {
        router.push('/');
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="flex items-center justify-between w-full max-w-2xl mb-4">
                <Button
                    variant="outline"
                    onClick={handleBackToMenu}
                >
                    Back to Menu
                </Button>
                <div className='text-white p-2 bg-white/20 rounded-md'>
                    Score: {gameState.score}
                </div>
            </div>
            {
                isLoading ? (<GameLoading />) : (<><SoloGameBoard gameState={gameState} /></>)
            }
            {gameState.isGameOver && (
                <div className="mt-4 text-white text-2xl">
                    <GameOver
                        title='Game Over!'
                        description='You went out of bounds!'
                        points={gameState.score}
                        gameRef={gameRef}
                        setGameState={setGameState}
                        onExit={handleBackToMenu}
                        mode='Solo' />
                </div>
            )}
        </div>
    );
}

async function setupGameComponents(): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    })
}