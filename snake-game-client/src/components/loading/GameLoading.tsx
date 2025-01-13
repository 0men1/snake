



export default function GameLoading() {
    return (
        // This outer div covers the entire screen and darkens the background
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            {/* The modal container with a contrasting background */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center space-y-6">
                {/* Loading animation */}
                <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 animate-pulse" />
                </div>
                
                {/* Loading message */}
                <p className="text-gray-300">
                    Preparing your game...
                </p>
            </div>
        </div>
    );
}