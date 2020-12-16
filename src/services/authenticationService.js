import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../_helpers/handle-response';
import {config} from '../_helpers/config';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('jtwToken')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, senha) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    };

    // console.log(config.baseURL);

    return fetch(`${config.baseURL}/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(user.user){
                localStorage.setItem('jtwToken', JSON.stringify(user));
                currentUserSubject.next(user);
            }
           
            

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jtwToken');
    localStorage.removeItem('jwtToken');
    currentUserSubject.next(null);
}