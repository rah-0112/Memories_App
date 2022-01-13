import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../src/components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <NavBar />
                <Switch>
                    <Route path='/' exact component={() => <Redirect to="/posts" />} />
                    <Route path='/posts' exact component={Home} />
                    <Route path='/posts/search' exact component={Home} />
                    <Route path='/posts/:id' component={PostDetails} />
                    <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
                    <Route path={[ '/creator/:name', '/tag/:name' ]} component={CreatorOrTag} /> 
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;
