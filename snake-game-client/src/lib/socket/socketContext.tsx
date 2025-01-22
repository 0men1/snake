"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SocketContextType {
    socket: WebSocket | null;
    status: 'connected' | 'disconnected' | 'connecting'
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const socketRef = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<SocketContextType['status']>('disconnected');

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = new WebSocket('ws://localhost:8080');

            socketRef.current.onmessage = (event) => {
                console.log("New message received from sever: ", event.type)
            }

            socketRef.current.onopen = () => setStatus("connected") 
            socketRef.current.onclose = () => setStatus("disconnected")
            socketRef.current.onerror = () => setStatus("connecting")
        }
    }, []);


    return (
        <SocketContext.Provider value={{ socket: socketRef.current, status }}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocket must be used within SocketProvider")
    return context;
}