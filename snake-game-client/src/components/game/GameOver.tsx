/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface GameOverProps {
    title: string;
    description: string;
    mode: string;
    gameRef: React.RefObject<any>;
    setGameState: React.Dispatch<React.SetStateAction<any>>;
    points: number;
    onExit: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
    title,
    description,
    gameRef,
    setGameState,
    points,
    onExit,
    mode
}) => {
    const handleRestart = () => {
        if (gameRef.current) {
            gameRef.current.reset();
            setGameState(gameRef.current.getState());
        }
    };

    useEffect(() => {
        const handleRestartKeyPress = (e: KeyboardEvent) => {
            switch (e.code) {
                case "Space":
                    handleRestart();
                    break;
            }
        }
        window.addEventListener('keydown', handleRestartKeyPress)
        return () => window.removeEventListener('keydown', handleRestartKeyPress)
    }, [handleRestart]) // Added dependency array

    const handleSubmitScore = () => {
        console.log('Submitting score:', points);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <Card className="w-96 bg-zinc-900 border-zinc-800 text-white animate-in zoom-in-95 duration-200">
                <CardHeader className="text-center space-y-4">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        {title}
                    </CardTitle>
                    <div className="flex items-center justify-center gap-2 text-amber-400">
                        <Trophy className="w-6 h-6" />
                        <span className="text-3xl font-bold">{points}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-zinc-400 text-center">
                        {description}
                        <br />
                        <br />
                        {`Mode: ${mode}`}
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleRestart}
                    >
                        Play Again
                    </Button>
                    <Button
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        onClick={handleSubmitScore}
                    >
                        Submit to Leaderboard
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        onClick={onExit}
                    >
                        Exit to Menu
                    </Button>
                    <p className='text-base'>Press &quot;Space&quot; to play again</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default GameOver;