import React from 'react';
import {Grid} from '@material-ui/core';

import {Row} from './Row/Row';
import {Cell} from './Row/Cell/Cell';

class BoardCell {
    constructor(knight = null) {
        this.knight = knight;
    }
}
class BoardKnight {}

const mockBoard = [
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()],
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()],
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()],
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()],
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(new BoardKnight()), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()],
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()],
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()],
    [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()]
]

export const Board = () => {
    const getCells = (row, rowIndex) => row.map((cell, i) =>
        <Cell classes={i % 2 === rowIndex % 2 ? 'grey' : 'greyer'} enabled={true} item={cell.knight}></Cell>)

    return (
        <div>
            {mockBoard.map((row, rowIndex) =>
            <Grid container direction="column" justify="center" alignItems="center">
                <Row>
                    {getCells(row, rowIndex)}
                </Row>
            </Grid>
            )}
        </div>
    );
}