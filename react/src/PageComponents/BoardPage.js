import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from "../store";
import axios from "axios";

class Card extends Component {
    render() {
        return (
            <div className="card">
                {this.props.name}
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
        this.prepareCards();
    }

    prepareCards() {
        axios.get('http://localhost:8080/lists/' + this.props.list_id + '/cards').then(res => {
            const cards = res.data.cards;
            this.setState({ cards });
        });
    }

    render() {
        return (
            <div className="list">
                {this.props.name}
                {this.state.cards.map(card => <Card name={card.name} />)}
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
        console.log(props);
        this.prepareLists();
    }

    async prepareLists() {
        axios.get('http://localhost:8080/boards/' + this.props.match.params.id + '/lists').then(res => {
            const lists = res.data.lists;
            this.setState({ lists });
        });
    }

    render() {
        console.log(store.getState().user.token)
        return (
            <div className="board">
                <div className="row">
                    {this.state.lists.map(list => <List name={list.name} list_id={list.id} />)}
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
