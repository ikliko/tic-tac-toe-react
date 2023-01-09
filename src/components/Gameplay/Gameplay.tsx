import {ChangeEventHandler, MouseEventHandler, useEffect, useState} from "react";
import './Gameplay.css';
import {Player} from "../../types/gamefield";
import {defaultFieldState, defaultGameState} from "../../constants/gamefield";
import {FieldSymbols} from "../../enums/gameplay";
import Playground from "../Playground/Playground";
import {checkForWinner} from "../../helpers/checkForWinner";
import ConfigScreen from "../ConfigScreen/ConfigScreen";

function Gameplay() {
    const [showField, setShowField] = useState<boolean>(false)
    const [fieldSize, setFieldSize] = useState<number | null>(null);
    const [field, setField] = useState(defaultFieldState());
    const [playerOne, setPlayerOne] = useState<Player>({
        name: '',
        score: 0,
        sign: FieldSymbols.X,
    });
    const [playerTwo, setPlayerTwo] = useState<Player>({
        name: '',
        score: 0,
        sign: FieldSymbols.O
    });
    const [currentPlayer, setCurrentPlayer] = useState(playerOne);
    const [game, setGame] = useState({
        ...defaultGameState
    });
    const newGame = () => {
        if (!fieldSize) {
            return;
        }

        setGame({
            ...defaultGameState
        });
        setField(defaultFieldState(fieldSize));
        setCurrentPlayer(playerOne);
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

    const onCellClick = (row: number, cell: number) =>
        () => {
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
            newField[row][cell] = currentPlayer.sign;
            setField(newField);
        }

    const updateWinner = () => {
        if (!fieldSize) {
            return;
        }

        const winnerSign = checkForWinner({
            field, fieldSize
        });

        if (!winnerSign) {
            return;
        }

        if (winnerSign === playerOne.sign) {
            setPlayerOne(store => ({
                ...store,
                score: store.score + 1
            }));

            setGame({
                ...game,
                isRunning: false,
                winner: playerOne
            });

            return;
        }

        setPlayerTwo(store => ({
            ...store,
            score: store.score + 1
        }))
        setGame({
            ...game,
            isRunning: false,
            winner: playerTwo
        });
    }

    useEffect(() => {
        if (game.isFirstMove) {
            return;
        }

        updateWinner()
        checkForAvailableFields();
        updateCurrentPlayer();

        return () => {
        }
    }, [field, fieldSize]);

    const handleBoardSizeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const size = +event.target.value

        setFieldSize(size);

        setField(defaultFieldState(size));
    }

    const handlePlayerOneNameChange: ChangeEventHandler<HTMLInputElement> = evt => {
        setPlayerOne({
            ...playerOne,
            name: evt.target.value
        })
    }

    const handlePlayerTwoNameChange: ChangeEventHandler<HTMLInputElement> = evt => {
        setPlayerTwo({
            ...playerTwo,
            name: evt.target.value
        })
    }

    const startGame = () => {
        if (!fieldSize || !field) {
            return;
        }
        setShowField(true);
    }

    const setPlayersSign: (sign: FieldSymbols) => MouseEventHandler<HTMLButtonElement> = (sign: FieldSymbols) => {
        return evt => {
            setPlayerOne({
                ...playerOne,
                sign
            });

            setPlayerTwo({
                ...playerTwo,
                sign: sign === FieldSymbols.X ? FieldSymbols.O : FieldSymbols.X
            });
        }
    }


    return <div>
        {
            showField && field ?
                <Playground field={field}
                            currentPlayer={currentPlayer}
                            playerTwo={playerTwo}
                            playerOne={playerOne}
                            onCellClick={onCellClick}
                            newGame={newGame}
                            game={game}/>
                : <ConfigScreen handleBoardSizeChange={handleBoardSizeChange}
                                handlePlayerOneNameChange={handlePlayerOneNameChange}
                                handlePlayerTwoNameChange={handlePlayerTwoNameChange}
                                setPlayersSign={setPlayersSign}
                                startGameClick={startGame}/>
        }
    </div>
}

export default Gameplay;