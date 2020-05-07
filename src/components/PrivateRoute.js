import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/authenticationService';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {

        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.user.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/login'}} />
            // component= { () => {some logic to determine which user then return the appropriate component} } 
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)