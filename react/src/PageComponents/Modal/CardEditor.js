import {Component} from "react";
import api from "../../api";
import React from "react";
import { Form, Text } from 'informed';

import "../../style/CardEditor.css"
import {Link} from "react-router-dom";

class CardEditor extends Component {
    state = {card: {name: ""}};
    constructor(props) {
        super(props);
        this.setFormAPI = this.setFormAPI.bind(this);
        api.getSingleCard(this.props.match.params.id).then(res =>{
            this.setState({card: res.data});
            this.render();
        })
    }

    setFormAPI(newFormAPI){
        this.setState({formAPI: newFormAPI});
    }

    render() {
        return (
            <div className={"modal-content"}>
                <Form getApi={this.setFormAPI} initialValues={
                    {name: this.state.card.name,
                    description: this.state.card.description
                    }}>
                    Name: <Text field="name" id="name"/><br/>
                    Description: <Text field="description" id="description"/><br/>
                    <button onClick={()=>{
                        this.props.history.goBack();
                    }}>Cancel</button>
                    <button onClick={()=>{
                        api.updateCard(this.state.card.id, {"name": this.state.formAPI.getState().values.name, "description": this.state.formAPI.getState().values.description}).then(() =>
                        {
                            api.getSingleCard(this.state.card.id).then(res =>
                            console.log(res.data))
                        });

                        this.props.history.goBack();
                    }}>Save & Exit</button>
                </Form>
            </div>
        );
    }
}

export default CardEditor;