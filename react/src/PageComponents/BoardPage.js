import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from "../store";
import ChangeableText from './ChangeableText';
import axios from "axios";
import api from "../api";

class Card extends Component {
    render() {
        return (
            <div className="card">
                <ChangeableText text={this.props.name} apiURL={"/cards/" + this.props.id}/>
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
        this.setState({cards: this.props.cards});
    }

    render() {
        return (
            <div className="list">
                <ChangeableText text={this.props.name} apiURL={"/lists/" + this.props.list_id} />
                {this.state.cards.map(card => <Card name={card.name} id={card.id}/>)}
                <button className="addCardButton">Add Card</button>
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
        api.getSingleBoard(this.props.match.params.id).then(res => {
            const lists = res.data.lists;
            this.setState({ lists });
        });
    }

    render() {
        console.log(store.getState().user.token)
        return (
            <div className="board">
                <div className="row">
                    {this.state.lists.map(list => <List name={list.name} cards={list.cards} list_id={list.id}/>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.user)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(BoardPage)
