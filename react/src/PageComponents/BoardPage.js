import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from "../store";
import ChangeableText from './ChangeableText';
import { ModalLink }  from 'react-router-modal'
import api from "../api";
import {Link} from "react-router-dom";
import "../style/BoardsPage.css"

class Card extends Component {
    render() {
        return (
            <div className={"card"}>
                <Link to={'/card/' + this.props.id}>
                    {this.props.name}
                </Link>
            </div>
        )
    }
}

class List extends Component {
    state = {
        cards: []
    };

    constructor(props) {
        super(props);
        api.getListCards(this.props.list_id).then(res =>{
            const cards = res.data.cards;
            this.setState({cards})
        });
    }

    render() {
        return (
            <div className="list">
                <ChangeableText text={this.props.name} apiURL={"/lists/" + this.props.list_id} />
                {/*<button onClick={() => {*/}
                {/*}}>*/}
                    {/*<FontAwesomeIcon icon={"trash-alt"}/>*/}
                {/*</button>*/}
                {this.state.cards.map(card => <Card card={card} name={card.name} id={card.id} board_id={this.props.board_id}/>)}
                <button className="addCardButton" onClick={() => {
                    api.createNewCardInList(this.props.list_id, {"name": "New card", "description": "ok", "position": 0});
                    api.getListCards(this.props.list_id).then(res =>{
                        const cards = res.data.cards;
                        this.setState({cards});
                        this.render();
                    });
                }}>Add Card</button>
            </div>
        )
    }
}


class BoardPage extends Component {
    state = {
        lists: [],
        currUser:[]
    };

    constructor(props) {
        super(props);
        this.prepareLists();
    }

    async prepareLists() {
        api.getSingleBoardWithCards(this.props.match.params.id).then(res => {
            const lists = res.data.lists;
            console.log(res.data);
            this.setState({ lists });
        });
    }

    render() {
        console.log(store.getState().user.token);
        return (
            <div className="board">
                <div className="row">
                    {this.state.lists.map(list => <List name={list.name} cards={list.cards} list_id={list.id} board_id={this.props.match.params.id}/>)}
                    <button className={"addNewColumn"} onClick={() => {
                        api.createNewList(this.props.match.params.id, {"name": "New Column"});
                        this.prepareLists();
                        this.render()
                    }}>
                        Add new column
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.user);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(BoardPage)
