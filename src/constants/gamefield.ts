import {FieldSymbol, Game, Player} from "../types/gamefield";

export const defaultPlayerState: Player = {
    name: '',
    score: 0,
    sign: null
};

export const defaultFieldState: (size?: number) => (FieldSymbol | null)[][]
    = (size: number = 6) => Array(size).fill(null).map(r => Array(size).fill(null).map(c => null));

export const defaultGameState: Game = {
    isFirstMove: true,
    isRunning: true,
    winner: null,
};
