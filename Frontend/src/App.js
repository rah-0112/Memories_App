import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from '../src/components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
    <BrowserRouter>
        <Container maxWidth="lg">
            <NavBar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/auth' exact component={Auth} />
            </Switch>
        </Container>
    </BrowserRouter>
);

export default App;
