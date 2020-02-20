import React, {useState} from 'react';
import {Grid} from '@material-ui/core';

import {Row} from './Row/Row';
import {Cell} from './Row/Cell/Cell';

export const Board = ({children, board, onCellClick, isCellClickable, isContentInCell}) => {
    const getCell = (x, y) => {
        const cellClasses = [
            y % 2 === x % 2 ? 'grey' : 'greyer',
            board.cells[x][y].isHit ? 'stepped' : ''
        ];

        return <div onClick={() => onCellClick({x, y})} key={`[${x}][${y}]`}>
                <Cell classes={cellClasses.join(' ')} enabled={isCellClickable({x, y})}>
                    {isContentInCell({x, y}) ? children: ''}
                </Cell>
            </div>;
    };

    return (
        <Grid container direction="column-reverse">
            {board.cells.map((row, x) =>
            <Grid container key={x} direction="row" justify="center" alignItems="center">
                <Row>
                    {row.map((_, y) => getCell(x, y))}
                </Row>
            </Grid>
            )}
        </Grid>
    );
}