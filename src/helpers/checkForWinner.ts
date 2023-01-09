import {FieldSymbol, Player} from "../types/gamefield";
import {FieldSymbols} from "../enums/gameplay";

export const checkForWinner = ({
                                   fieldSize,
                                   field,
                               }: {
    fieldSize: number,
    field: (FieldSymbol | null)[][],
}) => {
    // rows
    for (const row of field) {
        let xCount = 0;
        let oCount = 0;

        for (const cell of row) {
            if (!cell) {
                break;
            }


            if (cell === FieldSymbols.X) {
                xCount++;

                if (xCount === fieldSize) {
                    return FieldSymbols.X;
                }

                continue;
            }

            oCount++;

            if (oCount === fieldSize) {
                return FieldSymbols.O;
            }
        }
    }

    // columns
    for (let i = 0; i < fieldSize; i++) {
        let xCount = 0;
        let yCount = 0;

        for (const row of field) {
            if (!row[i]) {
                break;
            }

            if (row[i] === FieldSymbols.X) {
                xCount++;

                if (xCount === fieldSize) {
                    return FieldSymbols.X;
                }

                continue;
            }

            yCount++;

            if (yCount === fieldSize) {
                return FieldSymbols.O;
            }
        }
    }

    // main diag
    let xCountMainDiag = 0;
    let yCountMainDiag = 0;
    let isBreak = false;

    const n = field.length;

    for (let i = 0; i < n; i++) {
        if (isBreak) {
            break;
        }

        for (let j = 0; j < n; j++) {
            // main diagonal - left to right
            if (i === j) {
                const cell = field[i][j];
                if (!cell) {
                    isBreak = true;

                    break;
                }

                if (cell === FieldSymbols.X) {
                    xCountMainDiag++;

                    if (xCountMainDiag === fieldSize) {
                        return FieldSymbols.X;
                    }

                    continue;
                }

                yCountMainDiag++;
                if (yCountMainDiag === fieldSize) {
                    return FieldSymbols.O;
                }
            }
        }
    }

    let xCountSecondDiag = 0;
    let yCountSecondDiag = 0;
    isBreak = false;
    for (let i = 0; i < n; i++) {
        if (isBreak) {
            break;
        }

        for (let j = 0; j < n; j++) {
            // main diagonal - left to right
            if ((i + j) == (n - 1)) {
                const cell = field[i][j];
                if (!cell) {
                    isBreak = true;

                    break;
                }

                if (cell === FieldSymbols.X) {
                    xCountSecondDiag++;

                    if (xCountSecondDiag === fieldSize) {
                        return FieldSymbols.X;
                    }

                    continue;
                }

                yCountSecondDiag++;
                if (yCountSecondDiag === fieldSize) {
                    return FieldSymbols.O;
                }
            }
        }
    }

    return null;
};
