import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

class Board extends Component {

    render(){
        return (
            <div className={"Board"}>
                {this.props.name}
            </div>
        )
    }

}

class BoardsPage extends Component {
    state = {
        boards: []
    };

    constructor(props){
        super(props);
        this.prepareBoards();
    }

    prepareBoards() {
        axios.get('http://localhost:8080/boards').then(res => {
            const boards = res.data;
            this.setState({ boards });
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                </div>
                <div className="body">
                    {this.state.boards.map(board => <Board name={board.name} id={board.id} />)}
                </div>

                <Link to={'/board'}>Do tablicy</Link>
            </div>
        )
    }
}

export default BoardsPage;