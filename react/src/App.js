import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Notifications from "react-notify-toast";

import BoardsPage from "./PageComponents/BoardsPage";
import BoardPage from "./PageComponents/BoardPage";
import Login from "./PageComponents/Login";

class App extends Component {
    render() {
        return (
            <div>
            <Notifications />
            <Router>
                <div>
                    <Route path={"/"} component={Login} exact/>
                    <Route path={"/boards"} component={BoardsPage}/>
                    <Route path={"/board/:id"} component={BoardPage}/>
                </div>
            </Router>
            </div>
        );
    }
}

export default App;
