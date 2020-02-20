import React, {useState} from 'react';
import {Board} from './Board/Board';

import createGame from '../../Game';
import {Knight} from './Board/Knight/Knight';

const initialGame = createGame();

export const Game = () => {
    const [game, setGame] = useState(initialGame);
    const [knightPlace, setKnightPlace] = useState();

    const moveKnight = newPlace => {
        if (!game.isMoveValid(knightPlace, newPlace)) {
            return;
        }

        const knightPlaceAfterComputerTurn = game.playTurn(knightPlace, newPlace);

        game.markHit(newPlace);
        setKnightPlace({...newPlace});

        setTimeout(() => {
            game.markHit(knightPlaceAfterComputerTurn);
            setKnightPlace({...knightPlaceAfterComputerTurn});
        }, 1000);
    };

    const isCellClickable = ({x, y}) => game.isMoveValid(knightPlace, {x, y});
    const isKnightInCell = ({x, y}) => knightPlace && knightPlace.x === x && knightPlace.y === y;

    return (
        <Board board={game.board} isCellClickable={isCellClickable} onCellClick={moveKnight} isContentInCell={isKnightInCell}>
            <Knight />
        </Board>
    );
};