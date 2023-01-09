import {FieldSymbol, Game, Player} from "../../types/gamefield";

import './Playground.css'
import {MouseEventHandler, useState} from "react";

const Playground = ({
                        game, playerOne, playerTwo, field, onCellClick, newGame, currentPlayer
                    }: {
    game: Game;
    currentPlayer: Player;
    playerOne: Player;
    playerTwo: Player;
    field: (FieldSymbol | null)[][];
    onCellClick: (row: number, cell: number) => () => void;
    newGame: () => void;
}) => {
    const [placeholder, setPlaceholder] = useState<{
        sign: FieldSymbol | null;
        position: {
            x: number;
            y: number;
        }
    } | null>(null)

    const onCellMouseEnter: (x: number, y: number) => MouseEventHandler<HTMLDivElement> = (x, y) =>
        evt => setPlaceholder({
            sign: currentPlayer.sign,
            position: {
                x, y
            }
        });

    const onCellMouseLeave = () => {
        setPlaceholder(null);
    }

    return (
        <div className="board">
            {
                !game.isRunning && !game.winner ?
                    <div className="Gameplay-game-over">
                        <h2>Tie</h2>

                        <button type="button"
                                onClick={newGame}>
                            New game
                        </button>
                    </div> : ''
            }

            {
                !game.isRunning && game.winner ?
                    <div className="Gameplay-game-over">
                        <h2>Winner: {game.winner.sign}</h2>

                        <button type="button"
                                onClick={newGame}>New game
                        </button>
                    </div> : ''
            }

            <section className="board__info">
                <div className="player">
                    <p className="player__heading"><strong>{playerOne.name ? playerOne.name : 'Player one'}</strong></p>

                    <div className="player__info">
                        <p>Symbol: {playerOne.sign}</p>

                        <p>Score: {playerOne.score}</p>
                    </div>
                </div>

                <div className="player">
                    <p className="player__heading"><strong>{playerTwo.name ? playerTwo.name : 'Player two'}</strong></p>

                    <div className="player__info">
                        <p>Symbol: {playerTwo.sign}</p>

                        <p>Score: {playerTwo.score}</p>
                    </div>
                </div>
            </section>

            <section className="playground">
                {
                    field.map((row, rowI) => (
                        <div className="playground__row"
                             key={rowI}>
                            {
                                row.map((cell, cellI) => (
                                    <div key={cellI}
                                         onMouseEnter={onCellMouseEnter(rowI, cellI)}
                                         onMouseLeave={onCellMouseLeave}
                                         onClick={onCellClick(rowI, cellI)}
                                         className="playground__cell">
                                        {cell ? cell : ''}

                                        {
                                            !cell &&
                                            placeholder &&
                                            placeholder.position.x === rowI &&
                                            placeholder.position.y === cellI ?
                                                (
                                                    <span className="playground__placeholder">{placeholder.sign}</span>
                                                ) :
                                                ''
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </section>
        </div>
    )
};

export default Playground;