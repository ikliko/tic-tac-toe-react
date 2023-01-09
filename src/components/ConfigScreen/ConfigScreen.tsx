import {FieldSymbols} from "../../enums/gameplay";
import {ChangeEventHandler, FormEventHandler, MouseEventHandler, useState} from "react";

import './ConfigScreen.css';

const ConfigScreen = ({
                          handlePlayerOneNameChange,
                          setPlayersSign,
                          handlePlayerTwoNameChange,
                          handleBoardSizeChange,
                          startGameClick
                      }: {
    handlePlayerOneNameChange: ChangeEventHandler<HTMLInputElement>;
    setPlayersSign: (sign: FieldSymbols) => MouseEventHandler<HTMLButtonElement>;
    handlePlayerTwoNameChange: ChangeEventHandler<HTMLInputElement>;
    handleBoardSizeChange: ChangeEventHandler<HTMLInputElement>;
    startGameClick: FormEventHandler<HTMLFormElement>;
}) => {
    const [activeSign, setActiveSign] = useState<FieldSymbols>(FieldSymbols.X);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const switchSign: (sign: FieldSymbols) => MouseEventHandler<HTMLButtonElement> = (sign: FieldSymbols) => {
        return evt => {
            setActiveSign(sign);
            setPlayersSign(sign)(evt)
        }
    }

    const _handleBoardSizeChange: ChangeEventHandler<HTMLInputElement> = evt => {
        setIsFormValid(true);
        handleBoardSizeChange(evt)
    }

    return (
        <form onSubmit={startGameClick}
              className="form">
            <div className="form__group">
                <label htmlFor="playerOneName">Player one name:</label>

                <input type="text"
                       onChange={handlePlayerOneNameChange}
                       id="playerOneName"/>
            </div>

            <div className="form__group">
                <label>Player one Sign:</label>

                <div className="pick-sign__wrapper">
                    <button type="button"
                            className={`config-button${activeSign === FieldSymbols.X ? ' active' : ''}`}
                            onClick={switchSign(FieldSymbols.X)}>
                        X
                    </button>

                    <button type="button"
                            className={`config-button${activeSign === FieldSymbols.O ? ' active' : ''}`}
                            onClick={switchSign(FieldSymbols.O)}>
                        O
                    </button>
                </div>
            </div>

            <div className="form__group">
                <label htmlFor="playerTwoName">Player two name:</label>

                <input type="text"
                       onChange={handlePlayerTwoNameChange}
                       id="playerTwoName"/>
            </div>

            <div className="form__group">
                <label htmlFor="playerOneName">Board size*:</label>

                <input type="text"
                       onChange={_handleBoardSizeChange}
                       id="playerTwoName"/>
            </div>

            <button disabled={!isFormValid}>
                Play
            </button>
        </form>
    );
}

export default ConfigScreen;