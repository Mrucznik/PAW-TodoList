import React, {Component} from "react";
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
    }

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
        console.log(this.state.boards);
        return (
            <div>
                <div className="header">

                </div>
                <div className="body">
                    {this.state.boards.map(board => <Board name={board.name}/>)}
                </div>
            </div>
        )
    }
}

export default BoardsPage;