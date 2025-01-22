/* eslint-disable @typescript-eslint/no-explicit-any */

export type GameMessage = {
    type: "GAME_START" | "GAME_STATE" | "GAME_OVER";
    payload: any;
}

