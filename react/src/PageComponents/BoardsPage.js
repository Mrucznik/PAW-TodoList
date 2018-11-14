import React, {Component} from "react";
import { Link } from 'react-router-dom';
import ChangeableText from './ChangeableText';
import axios from "axios";
import { connect } from 'react-redux';
import store from "../store";
import api from "../api";

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
        api.getBoards().then(res => {
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

const mapStateToProps = state => {
    console.log(state.user)
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {})(BoardsPage)