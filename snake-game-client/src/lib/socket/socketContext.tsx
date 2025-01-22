"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { GameMessage } from "./types";
import { GameState } from "@shared/types";

interface SocketContextType {
    socket: WebSocket | null;
    status: 'connected' | 'disconnected' | 'connecting',
    sendMessage: (msg: GameMessage) => void;
    gameState: GameState | null
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const socketRef = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
    const [gameState, setGameState] = useState<GameState | null>(null);

    const sendMessage = (msg: GameMessage) => {
        if (socketRef.current) {
            socketRef.current.send(JSON.stringify(msg));
        }
    };

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = new WebSocket('ws://localhost:8080');

            socketRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data)
                setGameState(data);
            }

            socketRef.current.onopen = () => setStatus("connected")
            socketRef.current.onclose = () => setStatus("disconnected")
            socketRef.current.onerror = () => setStatus("connecting")
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, status, sendMessage, gameState }}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocket must be used within SocketProvider")
    return context;
}