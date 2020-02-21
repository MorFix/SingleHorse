import React from 'react';
import {Grid} from '@material-ui/core';

import {Row} from './Row/Row';
import {Cell} from './Row/Cell/Cell';

export const Board = ({children, board, onCellClick, isCellClickable, isContentInCell}) => {
    const getCell = (y, x) => {
        const cellClasses = [
            y % 2 === x % 2 ? 'grey' : 'greyer',
            board.cells[y][x].isHit ? 'stepped' : ''
        ];

        return <div onClick={() => onCellClick({y, x})} key={`[${y}][${x}]`}>
                <Cell classes={cellClasses.join(' ')} enabled={isCellClickable({y, x})}>
                    {isContentInCell({y, x}) ? children: ''}
                </Cell>
            </div>;
    };

    return (
        <Grid container direction="column-reverse">
            {board.cells.map((row, y) =>
            <Grid container key={y} direction="row" justify="center" alignItems="center">
                <Row>
                    {row.map((_, x) => getCell(y, x))}
                </Row>
            </Grid>
            )}
        </Grid>
    );
};