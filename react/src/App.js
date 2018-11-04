import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

import BoardsPage from "./PageComponents/BoardsPage";
import BoardPage from "./PageComponents/BoardPage";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path={"/"} component={BoardsPage} exact/>
                    <Route path={"/board/:id"} component={BoardPage}/>
                </div>
            </Router>
        );
    }
}

export default App;
