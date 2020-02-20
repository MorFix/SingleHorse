import React, {useState} from 'react';
import {Grid} from '@material-ui/core';

import {Row} from './Row/Row';
import {Cell} from './Row/Cell/Cell';

import createGame from '../../Game';

const initialGame = createGame();

export const Board = () => {
    const [game, setGame] = useState(initialGame);
    const [knightPlace, setKnightPlace] = useState({x: 0, y:0})

    const moveKnight = ({x, y}) => {
        if (!game.isMoveValid({x, y})) {
            return;
        }

        const newKnightPosition = game.playTurn();
        setKnightPlace({x, y});

        setTimeout(() => setKnightPlace({x: newKnightPosition.x, y: newKnightPosition.y}), 1000)
    };

    const getCells = (row, rowIndex) => row.map((cell, cellIndex) => {
        const isEnabled = game.isMoveValid({x: knightPlace.x, y: knightPlace.y}, {x: rowIndex, y: cellIndex});
        const item = knightPlace.x === rowIndex && knightPlace.y === cellIndex ? {} : null;

        return <Cell key={cellIndex}
                     onClick={() => moveKnight({x: knightPlace.x, y: knightPlace.y})} 
                     classes={cellIndex % 2 === rowIndex % 2 ? 'grey' : 'greyer'} 
                     enabled={isEnabled} 
                     item={item}>
                </Cell>;
    });

    return (
        <div>
            {game.board.cells.map((row, rowIndex) =>
            <Grid container key={rowIndex} direction="column-reverse" justify="center" alignItems="center">
                <Row>
                    {getCells(row, rowIndex)}
                </Row>
            </Grid>
            )}
        </div>
    );
}