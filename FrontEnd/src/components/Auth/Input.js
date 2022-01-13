import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visiblity from '@material-ui/icons/Visibility';
import VisiblityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, autoFocus, type, handleShowPassword, half }) => {
    return (
        <Grid item xs={12} sm={ half ? 6 : 12 }>
            <TextField
                name={name}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                { type === 'password' ? <Visiblity /> : <VisiblityOff /> }
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null }
            />
        </Grid>
    );
}

export default Input;
