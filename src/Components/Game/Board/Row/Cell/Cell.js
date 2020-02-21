import React from 'react';
import {Paper, Grid} from '@material-ui/core';

import './Cell.css';

export const Cell = ({children, classes, enabled}) => {
    const paperClasses = `Cell ${enabled ? 'pointer' : ''}`;

    return (
            <Paper className={paperClasses} square={true}>
                <Grid container className={`fullHeight ${classes}`} direction="column" justify="center" alignItems="center">
                    {children}
                </Grid>
            </Paper>
    );
};