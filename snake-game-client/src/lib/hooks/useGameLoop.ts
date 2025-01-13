import { useEffect, useRef } from "react";

export function useGameLoop(callback: () => void, targetFPS: number = 10) {
    // Store the ID for our animation frame request
    // We need this to clean up properly when the component unmounts
    const animationFrameId = useRef<number>(undefined);

    // Keep track of when we last updated the game
    // This helps us maintain consistent game speed
    const lastUpdateTime = useRef<number>(undefined);

    // Calculate how many milliseconds should pass between updates
    // For example, at 10 FPS we want 100ms between updates
    const millisecondsPerFrame = useRef<number>(1000 / targetFPS);

    useEffect(() => {
        // This is our core animation function that runs every frame
        function gameLoop(currentTime: number) {
            // If this is the first frame, just store the time and continue
            if (lastUpdateTime.current === undefined) {
                lastUpdateTime.current = currentTime;
                animationFrameId.current = requestAnimationFrame(gameLoop);
                return;
            }

            // Calculate how much time has passed since our last update
            const timeSinceLastUpdate = currentTime - lastUpdateTime.current;

            // Check if enough time has passed for our next game update
            // This ensures we update at our target FPS, not the browser's refresh rate
            if (timeSinceLastUpdate >= millisecondsPerFrame.current) {
                // Run the game update
                callback();

                // Reset our timer to the current time
                // Note: We use currentTime, not currentTime - timeSinceLastUpdate
                // This helps prevent drift in our game timing
                lastUpdateTime.current = currentTime;
            }

            // Schedule the next frame
            animationFrameId.current = requestAnimationFrame(gameLoop);
        }

        // Start our game loop
        animationFrameId.current = requestAnimationFrame(gameLoop);

        // Cleanup function that runs when the component unmounts
        // This prevents memory leaks and unnecessary updates
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [callback, targetFPS]);
}