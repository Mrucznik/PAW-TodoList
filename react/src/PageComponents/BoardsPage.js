import React, {Component} from "react";
import { Link } from 'react-router-dom';
import ChangeableText from './ChangeableText';
import axios from "axios";

class Board extends Component {
    render(){
        return (
            <div className={"Board"}>
                <ChangeableText text={this.props.name} apiURL={"/boards/" + this.props.id} />
                <br/>
                <br/>
                <Link to={"/board/" + this.props.id}>
                    Przejdź do
                </Link>
            </div>
        )
    }
}

class BoardsPage extends Component {
    state = {
        boards: []
    };

    constructor(){
        super();
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
                <div className="body">
                    {this.state.boards.map(board => <Board name={board.name} id={board.id} />)}
                </div>
            </div>
        )
    }
}

export default BoardsPage;