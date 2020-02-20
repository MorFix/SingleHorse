import React, {useState} from 'react';
import {Board} from './Board/Board';

import createGame from '../../Game';
import {Knight} from './Board/Knight/Knight';

const initialGame = createGame();

export const Game = () => {
    const [game, setGame] = useState(initialGame);
    const [knightPlace, setKnightPlace] = useState();

    const playTurn = newPlace => {
        if (!game.isMoveValid(knightPlace, newPlace)) {
            return;
        }

        const knightPlaceAfterComputerTurn = game.playTurn(knightPlace, newPlace);

        game.markAsHit(newPlace);
        setKnightPlace({...newPlace});

        setTimeout(() => {
            game.markAsHit(knightPlaceAfterComputerTurn);
            setKnightPlace({...knightPlaceAfterComputerTurn});
        }, 1000);
    };

    const canMoveToCell = ({x, y}) => game.isMoveValid(knightPlace, {x, y});
    const isKnightInCell = ({x, y}) => knightPlace && knightPlace.x === x && knightPlace.y === y;

    return (
        <Board board={game.board} isCellClickable={canMoveToCell} onCellClick={playTurn} isContentInCell={isKnightInCell}>
            <Knight />
        </Board>
    );
};