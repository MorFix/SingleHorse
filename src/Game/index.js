import _ from 'lodash';

import {validMoves} from './moves';
import {computer, user} from './turns';

const sliceHeight = 4;
const sliceWidth = 2;
const knightXMoveSize = 1;
const knightYMoveSize = 2;
const turnsQueue = [computer, user];

const getCellDirections = ({x: newX ,y: newY} ,{x: knightX ,y: knightY}) => 
    [knightX - newX, knightY - newY]

const isMoveValid = (newCell, knightManCell) =>
    validMoves.includes(getCellDirections(newCell, knightManCell));

const moveKnight = (knight, newCell) => {
    knight.cell = newCell.coordinate;
};

const isGameOver = ({x: knightX, y: knightY}, board) =>
    validMoves.map(([x,y])=> [knightX + x, knightY + y])
    .every(([x, y]) => board.cells[x]?[y]?.isHit);

const getTurn = () => {
    const currentTurn = turnsQueue.pop();
    turnsQueue.unshift(currentTurn);

    return currentTurn;
};

const getSlice = ({x,y}) => ({
    sliceX: x - x % sliceWidth,
    sliceY: y - y % sliceHeight
});

const calculateBestMove = ({x, y}) => {
    const {sliceX, sliceY} = getSlice({x, y});

    const newX = x + knightXMoveSize >= sliceX + sliceWidth ? x - knightXMoveSize : x + knightXMoveSize;
    const newY = y + knightYMoveSize >= sliceY + sliceHeight ? y - knightYMoveSize : y + knightYMoveSize;

    return {newX, newY};
};

const moveComputer = (knight, board) => {
    moveKnight(calculateBestMove());
};

// const getSlicedBoard = board => {
//     const width = board.cells[0].length / sliceWidth;
//     const height = board.cells.length / sliceHeight;

//     return  _.range(width).map(x => _.range(height).map(y => 
//         ({x: x * sliceWidth, y: y * sliceHeight})
//     ));
// };