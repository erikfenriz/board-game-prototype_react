import React, {useEffect, useState} from 'react';
import Menu from "./Menu";
import Board from "./Board";
import useRequest from "../hooks/useRequest";
import setDate from "../helpres/setDate";

const Game = () => {
    const [getApi, postApi, results, errorMessage] = useRequest();
    const [settings, setSettings] = useState(null);
    const [gameSetup, setGameSetup] = useState(null);
    const [start, setStart] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        getApi('/game-settings')
    }, []);

    useEffect(() => {
        setSettings(results.data);
    }, [results]);

    const optionRenderer = (data, value, key) => <option key={key} value={data}>{value}</option>;
    const replacement = {
        columns: [
            {
                label: "Easy",
                dataPath: "easyMode",
                renderer: optionRenderer
            }, {
                label: "Normal",
                dataPath: "normalMode",
                renderer: optionRenderer
            }, {
                label: "Hard",
                dataPath: "hardMode",
                renderer: optionRenderer
            }]
    };

    const startNewGame = (name, difficulty) => {
        setGameSetup({name, difficulty});
        setStart(true);
        setWinner(false);
    };

    const pickWinner = (winner) => {
      setWinner(winner);
      setStart(false);
      postApi(winner, setDate());
    };

    return (<>
        {
            errorMessage ? <h1>{errorMessage}</h1> :
                <Menu settings={settings}
                      titles={replacement}
                      start={startNewGame}
                play={winner ? 'PLAY AGAIN' : 'PLAY'}/>
        }
        <h1 style={{
            color: '#909090',
            fontSize: 18,
            paddingBottom: 30
        }}>
            {winner ? `${winner} wins` : '\u00A0'}
        </h1>
        {
            start ?
                <Board setup={true}
                       settings={settings}
                       gameSetup={gameSetup}
                       pickWinner={pickWinner}
                /> :
                null
        }
    </>)
};

export default Game;