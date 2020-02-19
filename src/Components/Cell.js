import React from 'react';
import Horse from './Horse';

export default (horse = null) => {
    return (horse ? <Horse></Horse> : '');
}