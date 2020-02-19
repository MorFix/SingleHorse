import _ from 'lodash';

import validMoves from './moves';

const sliceHeight = 4;
const sliceWidth = 2;
const knightXMoveSize = 1;
const knightYMoveSize = 2;

const createBoard = (width = 8, height = 8) => ({
    cells : _.range(width).map(x => _.range(height).map(y => 
        ({x, y, isHit: false})
    ))
});

export default () => {
    const board = createBoard();

    const getCellDirections = ({x: newX ,y: newY} ,{x: knightX ,y: knightY}) => 
        [knightX - newX, knightY - newY]

    const isMoveValid = (knight, newCell) =>
        validMoves.includes(getCellDirections(newCell, knight));

    const moveKnight = (knight, newCell) => {
        knight = newCell;
        board[newCell.x][newCell.y].isHit = true;
    }

    const playTurn = (knight, newCell) => {
        if (isMoveValid(knight, newCell)) {
            moveKnight(knight, newCell);
        }

        return calculateBestMove(knight);
    };

    const isGameOver = ({x: knightX, y: knightY}) =>
        validMoves.map(([x,y])=> [knightX + x, knightY + y])
        .every(([x, y]) => board.cells[x][y].isHit);

    const getSlice = ({x,y}) => ({
        sliceX: x - x % sliceWidth,
        sliceY: y - y % sliceHeight
    });

    const calculateBestMove = ({x, y}) => {
        const {sliceX, sliceY} = getSlice({x, y});

        const newX = x + knightXMoveSize >= sliceX + sliceWidth ? x - knightXMoveSize : x + knightXMoveSize;
        const newY = y + knightYMoveSize >= sliceY + sliceHeight ? y - knightYMoveSize : y + knightYMoveSize;

        return {x: newX, y: newY};
    };

    return {
        board,
        playTurn,
        isGameOver,
        isMoveValid
    }
};

// const getSlicedBoard = board => {
//     const width = board.cells[0].length / sliceWidth;
//     const height = board.cells.length / sliceHeight;

//     return  _.range(width).map(x => _.range(height).map(y => 
//         ({x: x * sliceWidth, y: y * sliceHeight})
//     ));
// };

// const getTurn = () => {
//     const currentTurn = turnsQueue.pop();
//     turnsQueue.unshift(currentTurn);

//     return currentTurn;
// };