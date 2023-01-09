export declare type FieldSymbol = "X" | "O";

export interface Player {
    name: string,
    score: number,
    sign: FieldSymbol | null
}

export interface Game {
    isFirstMove: boolean;
    isRunning: boolean;
    winner: Player | null;
}