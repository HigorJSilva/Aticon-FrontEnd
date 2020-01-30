import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Index from './pages/index';
import login from './pages/Login';
import register from './pages/register';
import evento from './pages/eventos';

function Routes(){
    return(
        <Switch>
            <Route path="/" exact component ={Index} />
            <Route path="/login" exact component ={login} />
            <Route path="/register" exact component ={register} />
            <Route path="/eventos" exact component ={evento} />
        </Switch>
    )
}

export default Routes;
