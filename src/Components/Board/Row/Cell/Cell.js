import React from 'react';
import {Paper, Grid} from '@material-ui/core';

import {Knight} from '../../Knight/Knight';

import './Cell.css';

export const Cell = ({item, classes, enabled}) => {
    const paperClasses = `Cell ${enabled ? 'pointer' : ''}`;

    return (
            <Paper className={paperClasses} square="true">
                <Grid container className={`fullHeight ${classes}`} direction="column" justify="center" alignItems="center">
                    {item && <Knight></Knight>}
                </Grid>
            </Paper>
    );
}