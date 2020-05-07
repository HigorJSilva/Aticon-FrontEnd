import React, { Fragment } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';

import  {Role}  from './_helpers/Role';
import { PrivateRoute } from '../src/components/PrivateRoute'

import Index from './pages/index';
import login from './pages/login';
import register from './pages/register';
import evento from './pages/eventos';
import dash from './pages/dashboard';

function Routes(){
    return(
        <Switch>
                <Route path="/login" exact component = {login} />
                <Route path="/register" exact component ={register} />

                {/* <PrivateRoute exact path="/" roles={[Role.User]} component={Index} /> */}
                <Route exact path="/" component={Index} />
                <PrivateRoute exact path="/dashboard" roles={[Role.Admin]} component={dash} />
                <PrivateRoute exact path="/eventos"  roles={[Role.User,Role.Admin]} component ={evento} />

        </Switch>
    )
}

export default Routes;
