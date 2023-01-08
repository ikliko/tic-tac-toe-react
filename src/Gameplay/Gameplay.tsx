import {useEffect, useState} from "react";
import './Gameplay.css';

interface Player {
    name: string,
    score: number,
    sign: string
}

const defaultPlayerState: Player = {
    name: '',
    score: 0,
    sign: ''
};

const defaultFieldState:() => (string | null)[][] = () => [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const defaultGameState: {
    isFirstMove: boolean;
    isRunning: boolean;
    winner: Player | null;
} = {
    isFirstMove: true,
    isRunning: true,
    winner: null,
};

function Gameplay() {
    const [field, setField] = useState(defaultFieldState());
    const [playerOne, setPlayerOne] = useState({
        ...defaultPlayerState,
        sign: 'X'
    });
    const [playerTwo, setPlayerTwo] = useState({
        ...defaultPlayerState,
        sign: 'O'
    });
    const [currentPlayer, setCurrentPlayer] = useState(playerOne);
    const [game, setGame] = useState({
        ...defaultGameState
    });

    const checkForWinner = () => {

        // rows
        for (const row of field) {
            let xCount = 0;
            let oCount = 0;

            for (const cell of row) {
                if (!cell) {
                    break;
                }

                if (cell === playerOne.sign) {
                    xCount++;

                    if (xCount === 3) {
                        setGame({
                            ...game,
                            isRunning: false,
                            winner: playerOne
                        });

                        return;
                    }

                    continue;
                }

                oCount++;

                if (oCount === 3) {
                    setGame({
                        ...game,
                        isRunning: false,
                        winner: playerTwo
                    });

                    return;
                }
            }
        }

        // columns
        for (let i = 0; i < 3; i++) {
            let xCount = 0;
            let yCount = 0;

            for (const row of field) {
                if (!row[i]) {
                    break;
                }

                if (row[i] === playerOne.sign) {
                    xCount++;

                    if (xCount === 3) {
                        setGame({
                            ...game,
                            isRunning: false,
                            winner: playerOne
                        });

                        return;
                    }

                    continue;
                }

                yCount++;

                if (yCount === 3) {
                    setGame({
                        ...game,
                        isRunning: false,
                        winner: playerTwo
                    });

                    return;
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

                    if (cell === playerOne.sign) {
                        xCountMainDiag++;

                        if (xCountMainDiag === 3) {
                            setGame({
                                ...game,
                                isRunning: false,
                                winner: playerOne
                            });

                            return;
                        }

                        continue;
                    }

                    yCountMainDiag++;
                    if (yCountMainDiag === 3) {
                        setGame({
                            ...game,
                            isRunning: false,
                            winner: playerTwo
                        });

                        return;
                    }
                }
            }
        }

        // second diag
        const cell1 = field[0][2];
        if (!cell1) {
            return;
        }

        const cell2 = field[1][1];
        if (!cell2) {
            return;
        }

        const cell3 = field[2][0];
        if (!cell3) {
            return;
        }

        if (cell1 !== cell2 || cell1 !== cell3 || cell2 !== cell3) {
            return;
        }

        if (cell1 === playerOne.sign) {
            setGame({
                ...game,
                isRunning: false,
                winner: playerOne
            });

            return;
        }

        setGame({
            ...game,
            isRunning: false,
            winner: playerTwo
        });

        return null;
    };


    const updateCurrentPlayer = () => {
        if (currentPlayer.sign === playerOne.sign) {
            setCurrentPlayer(playerTwo);

            return;
        }

        setCurrentPlayer(playerOne);
    };

    const checkForAvailableFields = () => {
        for (const row of field) {
            if (row.includes(null)) {
                return;
            }
        }

        setGame({
            ...game,
            isRunning: false,
        });
    };

    const newGame = () => {
        console.log(defaultGameState, defaultFieldState());

        setGame({
            ...defaultGameState
        });
        setField(defaultFieldState());
        setCurrentPlayer(playerOne);
    };

    const onCellClick = (row: number, cell: number) => {
        return () => {
            if (!game.isRunning) {
                return;
            }

            if (field[row][cell]) {
                return;
            }

            setGame({
                ...game,
                isFirstMove: false,
            });

            const newField = field.slice();
            console.log(newField, row, cell);
            newField[row][cell] = currentPlayer.sign;
            setField(newField);
        }
    };

    useEffect(() => {
        if (game.isFirstMove) {
            return;
        }

        checkForWinner();
        checkForAvailableFields();
        updateCurrentPlayer();


        return () => {
        }
    }, [field]);


    return <div className="Gameplay">
        {
            !game.isRunning && !game.winner ?
                <div className="Gameplay-game-over">
                    <h2>Tie</h2>

                    <button type="button"
                            onClick={newGame}>New game</button>
                </div> : ''
        }

        {
            !game.isRunning && game.winner ?
                <div className="Gameplay-game-over">
                    <h2>Winner: {game.winner.sign}</h2>

                    <button type="button"
                            onClick={newGame}>New game</button>
                </div> : ''
        }

        <div className="Gameplay-board">
            <span className="Gameplay-board-item">Current player: {currentPlayer.sign}</span>
            <span className="Gameplay-board-item">
                <button type="button"
                        onClick={newGame}>New game</button>
            </span>
        </div>

        <div className="Gameplay-field">
            {
                field.map((row, rowI) => (
                    <div key={++rowI}
                         className="Gameplay-row">
                        {
                            row.map((cell, cellI) => (
                                <div key={++cellI}
                                     onClick={onCellClick(rowI, cellI)}
                                     className="Gameplay-cell">
                                    {cell ? cell : ''}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    </div>
}

export default Gameplay;