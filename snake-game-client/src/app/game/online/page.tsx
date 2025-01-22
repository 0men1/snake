"use client"
import { useSocket } from "@/lib/socket/socketContext";

export default function OnlineMultiplayerGame() {
    const { gameState, sendMessage, status } = useSocket();

    const handleServerComm = () => {
        sendMessage({ type: "GAME_START", payload: {} })
        console.log(gameState)
    }

    return (
        <div className="p-4 rounded-lg bg-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="font-medium">Connection Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${status === 'connected' ? 'bg-green-100 text-green-700' :
                    status === 'disconnected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                    }`}>
                    {status}
                </span>
                <button
                    onClick={() => handleServerComm()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Ping Server
                </button>
            </div>
        </div>
    )

}