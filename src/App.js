import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

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
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
               {console.log(currentUser)}
                <div> 
                    <Drawer/>
                    {/* {currentUser &&
                    <Drawer logout={this.logout} isAdmin={isAdmin} />
                        // <nav className="navbar navbar-expand navbar-dark bg-dark">
                        //     <div className="navbar-nav">
                        //         <Link to="/" className="nav-item nav-link">Home</Link>
                        //         {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                        //         <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                        //     </div>
                        // </nav>
                    } */}
                </div>
                <Routes/>
            </Router>
        );
    }
}

export { App };