import {range} from 'lodash';

import possibleDirections from './directions';

const createBoard = (height, width) => {
    const {isValid, message} = validateDimensions(height, width);
    if (!isValid) {
        throw new Error(message);
    }

    const createCell = (rowIndex, colIndex) => ({y: rowIndex, x: colIndex, isHit: false});

    const createRow = rowIndex => range(width).map(cellIndex => createCell(rowIndex, cellIndex));

    return {
        cells: range(height).map(createRow)
    };
};

export const validateDimensions = (height, width) => {
    const areDividable = (!(height % 4) && !(width % 2)) ||
						 (!(height % 2) && !(width % 4));
    const isValid = height && width && areDividable;

    return {
        isValid,
        message: !isValid ? `Either height or width must be dividable by 4 and 2` : ''
    };
};

export default (height = 8, width = 8) => {
    const board = createBoard(height, width);

    const isHeightDividable = !(height % 4);
    const sliceHeight = isHeightDividable ? 4 : 2;
    const sliceWidth = isHeightDividable ? 2 : 4;

    let knightPlace;

    const getKnightPlace = () => knightPlace;

    const getCellDirections = ({y: newY, x: newX}) =>
        [newY - knightPlace.y, newX- knightPlace.x];

    const isMoveValid = ({y, x}) => {
        if (!knightPlace) {
            return true;
        }

        const [newYDirection, newXDirection] = getCellDirections({y, x});

        return possibleDirections.some(([y, x]) => y === newYDirection && x === newXDirection) &&
            board.cells[y] &&
            board.cells[y][x] &&
            !board.cells[y][x].isHit;
    };

    const markAsHit = ({y, x}) => {
        board.cells[y][x].isHit = true;
    };

    const moveKnight = move => {
        if (!isMoveValid(move)) {
            return false;
        }

        knightPlace = {...move};
        markAsHit(move);

        return true;
    };

    const getPossibleMoves = () => possibleDirections
        .map(([y, x]) => ({y: knightPlace.y + y, x: knightPlace.x + x}));

    const isGameOver = () => !!knightPlace && !getPossibleMoves().some(isMoveValid);

    const getSlice = ({y, x}) => ({
        y: Math.floor(y / sliceHeight),
        x: Math.floor(x / sliceWidth)
    });

    const getComputerMove = () => {
        const knightSlice = getSlice(knightPlace);

        return getPossibleMoves().find(move => {
            const {x, y} = getSlice(move);

            return y === knightSlice.y && x === knightSlice.x;
        });
    };

    const getSlices = () => ({
        y: sliceHeight,
        x: sliceWidth
    });

    return {
        isMoveValid,
        moveKnight,
        getComputerMove,
        getKnightPlace,
        isGameOver,
        getSlices,
        board
    }
};