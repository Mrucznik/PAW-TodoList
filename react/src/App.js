import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Notifications from "react-notify-toast";
import { clearToken } from "./actions/user"
import { ModalContainer, ModalRoute } from 'react-router-modal';

import BoardsPage from "./PageComponents/BoardsPage";
import BoardPage  from "./PageComponents/BoardPage";
import Login from "./PageComponents/Login";
import Register from "./PageComponents/Register";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import CardEditor from "./PageComponents/Modal/CardEditor";

import 'react-router-modal/css/react-router-modal.css'

library.add(faSignOutAlt);
library.add(faEllipsisH);
library.add(faTrashAlt);
class App extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout() {
        clearToken();
    }

    render() {
        let logoutButton =
            <div className={"logout"}>
                <Link to={'/'} onClick={() => this.logout()}>
                    Logout &nbsp;
                    <FontAwesomeIcon icon={"sign-out-alt"}/>
                </Link>
            </div>
        return (
            <div>
                <Router>
                    <div>
                        <div className="header">
                            {logoutButton}
                        </div>
                        <Notifications />
                        <div>
                            <Route path={"/"} component={Login} exact/>
                            <Route path={"/register"} component={Register}/>
                            <Route path={"/boards"} component={BoardsPage}/>
                            <Route path={"/board/:id"} exact component={BoardPage}/>
                            <ModalRoute path={"/card/:id"} component={CardEditor}/>
                            <ModalContainer/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
