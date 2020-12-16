import React from 'react';
import { Router } from 'react-router-dom';

import { history} from './_helpers/history';
import { Role} from './_helpers/Role';
import { authenticationService } from './services/authenticationService';
import Routes from './routes'
import Drawer from './components/Drawer'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {

        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x?.user,
            isAdmin: x?.user && x?.user?.role === Role.Admin
        }));

        // console.log(this.state.isAdmin)
    }

    logout() {
        authenticationService.logout();
        window.location.href='/login'
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div> 
                    {currentUser &&
                    <Drawer logout={this.logout} isAdmin={isAdmin} />
                    }
                </div>
                <Routes/>
            </Router>
        );
    }
}

export { App };