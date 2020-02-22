import React from 'react';
import {Box} from '@material-ui/core';

import './Row.css';

export const Row = ({children}) => {
    return (
        <Box className="row" display="flex" width="100%" flexDirection="row" justifyContent="center" alignItems="center">
            {children}
        </Box>
    );
};