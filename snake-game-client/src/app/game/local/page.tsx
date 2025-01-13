'use client'
import { DuelSnakeGame } from "@shared/engines/DuelSnakeGame";
import { Direction } from "@shared/types";
import DuelGameBoard from "@/components/game/DuelGameBoard";
import GameOver from "@/components/game/GameOver";
import { useGameLoop } from "@/lib/hooks/useGameLoop";
import { useEffect, useRef, useState } from "react";



export default function LocalMultiplayerGame() {
    const gameRef = useRef<DuelSnakeGame>(new DuelSnakeGame(20));
    const [gameState, setGameState] = useState(gameRef.current.getState());

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.repeat) return; // Ignore held keys
            switch (e.code) {
                case 'KeyW': gameRef.current.changeDirection(Direction.UP, 0); break;
                case 'KeyA': gameRef.current.changeDirection(Direction.LEFT, 0); break;
                case 'KeyS': gameRef.current.changeDirection(Direction.DOWN, 0); break;
                case 'KeyD': gameRef.current.changeDirection(Direction.RIGHT, 0); break;

                case 'ArrowUp': gameRef.current.changeDirection(Direction.UP, 1); break;
                case 'ArrowLeft': gameRef.current.changeDirection(Direction.LEFT, 1); break;
                case 'ArrowDown': gameRef.current.changeDirection(Direction.DOWN, 1); break;
                case 'ArrowRight': gameRef.current.changeDirection(Direction.RIGHT, 1); break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [])

    useGameLoop(() => {
        if (!gameState.isGameOver) {
            gameRef.current.update();
            setGameState(gameRef.current.getState());
        }
    }, 10)


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="flex justify-between w-full max-w-2xl mb-4">
                <div className="text-white p-2 bg-blue-500/20 rounded-md">
                    Player 1: {gameState.players[0].score}
                </div>
                <div className="text-white p-2 bg-green-500/20 rounded-md">
                    Player 2: {gameState.players[1].score}
                </div>
            </div>
            {!gameState.isGameOver ?
                <DuelGameBoard
                    gameState={gameState} /> :
                <GameOver
                    mode="Duel"
                    title="Game Over"
                    description={`Player ${gameState.winner! + 1} won!`}
                    points={gameState.players[gameState.winner || 0].score}
                    gameRef={gameRef}
                    setGameState={setGameState}
                    onExit={() => { }}
                />}
        </div>
    )

}