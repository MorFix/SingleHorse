import React, {useState} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Button, Typography} from '@material-ui/core';

import {Board} from './Board/Board';
import {Knight} from './Board/Knight/Knight';

import createGame, {validateDimensions} from '../../Game';
import './Game.css';

let gameInstance = createGame();

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const Game = () => {
    const backdropClasses = useStyles();

    const [dimensionsError, setDimensionsError] = useState();
    const [board, setBoard] = useState(gameInstance.board);
    const [boardHeight, setBoardHeight] = useState(gameInstance.board.cells.length);
    const [boardWidth, setBoardWidth] = useState(gameInstance.board.cells[0].length);
    const [knightPlace, setKnightPlace] = useState(gameInstance.getKnightPlace());
    const [isComputerTurn, setIsComputerTurn] = useState(false);
    const [isBorderHidden, setIsBorderHidden] = useState(false);

    const resetGame = (boardHeight, boardWidth) => {
        const {isValid} = validateDimensions(boardHeight, boardWidth);
        if (isValid) {
            gameInstance = createGame(boardHeight, boardWidth);
        } else {
            gameInstance = createGame(gameInstance.board.cells.length, gameInstance.board.cells[0].length)
        }

        clearTimeout(isComputerTurn);
        setDimensionsError();
        setBoard(gameInstance.board);
        setKnightPlace(gameInstance.getKnightPlace());
        setIsComputerTurn(false);
    };

    const changeBoardDimensions = () => {
        const {isValid, message} = validateDimensions(boardHeight, boardWidth);

        if (!isValid) {
            setDimensionsError(message);
        } else {
            resetGame(boardHeight, boardWidth);
        }
    };

    const equalPlaces = ({y, x}, {y: otherY, x: otherX}) => y === otherY && x === otherX;

    const moveKnight = requestedPlace => {
        if (knightPlace && equalPlaces(knightPlace, requestedPlace)) {
            return false;
        }

        return gameInstance.moveKnight(requestedPlace);
    };

    const playTurn = requestedPlace => {
        if (isComputerTurn || !moveKnight(requestedPlace)) {
            return;
        }

        const newPlace = gameInstance.getKnightPlace();
        setKnightPlace(newPlace);

        setIsComputerTurn(setTimeout(() => {
            moveKnight(gameInstance.getComputerMove());

            setKnightPlace(gameInstance.getKnightPlace());
            setIsComputerTurn(false);
        }, 1000));
    };

    const isKnightInCell = cell => {
        const knight = gameInstance.getKnightPlace();

        return knight && equalPlaces(knight, cell);
    };

    const getCellBorders = cell => {
      if (isBorderHidden) {
          return false;
      }

      const borders = gameInstance.getSlices();

      return {
          top: !((cell.y + 1) % borders.y),
          bottom: !cell.y,
          right: !((cell.x + 1) % borders.x),
          left: !cell.x
      }
    };

    return (
        <Grid className="container" align-items="center">
            <Backdrop className={backdropClasses.backdrop} open={gameInstance.isGameOver()}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="h2">
                        Game Over!
                    </Typography>
                    <Button variant="contained" color="primary" onClick={resetGame}>
                        Play Again
                    </Button>
                </Grid>
            </Backdrop>

            <Grid className="controls" align-items="center">
                <Typography variant="h4" color="primary">Options</Typography>
                <Grid container className="inputs" direction="column">
                    <Grid container direction="row" justify="space-between">
                        <Typography>Board Height</Typography>
                        <input type="number" value={boardHeight} onChange={({target}) => setBoardHeight(Number(target.value))}/>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Typography>Board Width</Typography>
                        <input type="number" value={boardWidth} onChange={({target}) => setBoardWidth(Number(target.value))}/>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Button className="button" variant="contained" color="secondary" onClick={changeBoardDimensions}>
                        Change
                    </Button>
                    <Button className="button" variant="contained" color="secondary" onClick={() => setIsBorderHidden(!isBorderHidden)}>
                        {isBorderHidden ? 'Show Borders' : 'Hide borders'}
                    </Button>
                    <Button className="button" variant="contained" color="primary" onClick={resetGame}>
                        Restart Game
                    </Button>
                </Grid>
                {dimensionsError ? <Typography className="red">{dimensionsError}</Typography> : ''}
            </Grid>

            <Grid className="game" align-items="center">
                <Typography variant="h3" color="primary">
                    The Single Knight
                </Typography>

                {
                    isComputerTurn ?
                        <Typography variant="subtitle1" className="red">
                            Computer is thinking..
                        </Typography>
                        :
                        <Typography variant="subtitle1" color="secondary">
                            It's your turn. Place the knight on a valid cell in the board.
                        </Typography>
                }

                <Board board={board}
                       isCellClickable={cell => !isComputerTurn && gameInstance.isMoveValid(cell)}
                       onCellClick={playTurn}
                       getCellBorders={getCellBorders}
                       isContentInCell={isKnightInCell}>
                    <Knight/>
                </Board>
            </Grid>
        </Grid>
    );
};