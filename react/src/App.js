import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

import BoardsPage from "./PageComponents/BoardsPage";
import Board from "./Board";

class App extends Component {
    state = {
        board_id: 1
    };

    constructor() {
        super();
        this.updateBoard.bind(this);
    }

    updateBoard(board_id) {
        this.setState({board_id});
        console.log(board_id);
    }

    render() {
        return (
            <Router>
                <div>
                <Route path={"/"} component={() => <BoardsPage/>} exact/>
                <Route path={"/board"} component={() => <Board board_id={this.state.board_id}/>}/>
                </div>
            </Router>
        );
    }
}

export default App;
