"use client"
import { useSocket } from "@/lib/socket/socketContext";

export default function OnlineMultiplayerGame() {
    const socket = useSocket();


    return (
        <div className="p-4 rounded-lg bg-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="font-medium">Connection Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${socket.status === 'connected' ? 'bg-green-100 text-green-700' :
                    socket.status === 'disconnected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                    }`}>
                    {socket.status}
                </span>
            </div>
        </div>
    )

}