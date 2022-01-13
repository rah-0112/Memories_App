import React, { useState } from 'react';
import { Container, Paper, Grid, Avatar, Button, Typography, Zoom } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signup, signin } from '../../actions/auth';

const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try Again Later!');
    }

    return (
        <Zoom in>
            <Container component='main' maxWidth='xs'>
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSumbit}>
                        <Grid container spacing={2}>
                            {isSignUp && (
                                <>
                                    <Input name='firstname' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastname' label='Last Name' handleChange={handleChange} half />
                                </>
                            )}
                            <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus/>
                            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/> 
                            {isSignUp && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password'/>}
                        </Grid> 
                        <Button className={classes.submit} type='sumbit' fullWidth variant='contained' color='primary' >{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                        {!isSignUp && (<GoogleLogin 
                            clientId='194547154669-tln0nchridgunk1g8v5osafd6phm4qq0.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color='primary'
                                    fullWidth
                                    variant='contained'
                                    startIcon={<Icon />}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    Sign In With Google
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy='single_host_origin'
                        />)}
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>{isSignUp ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Zoom>
    );
}

export default Auth;
