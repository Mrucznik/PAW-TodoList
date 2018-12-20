import React, {Component} from "react";
import { Link } from 'react-router-dom';
import ChangeableText from './ChangeableText';
import axios from "axios";
import { connect } from 'react-redux';
import store from "../store";
import api from "../api";
import "../style/BoardsPage.css"

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
        api.getAllBoards().then(res => {
            const boards = res.data;
            this.setState({ boards });
        });
    }

    render() {
        console.log(this.props.location);
        return (
            <div>
                <div className="body">
                    {this.state.boards.map(board => <Board name={board.name} id={board.id} />)}
                    <div className={"Board"}>
                        <button className={"AddBoard"} onClick={() => {
                            api.createNewBoard({"name" : "New Board", "locked": false});
                            this.prepareBoards()
                        }}>
                            Make new board
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.user)
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {})(BoardsPage)