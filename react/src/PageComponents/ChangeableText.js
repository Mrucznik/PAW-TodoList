import React, {Component} from 'react';
import { Form, Text } from 'informed';
import axios from "axios";

class ChangeableText extends Component {
    state = {
        text: "",
        changing: false
    };
    constructor(props){
        super(props);

        this.changeState = this.changeState.bind(this);
        this.setFormAPI = this.setFormAPI.bind(this);

        this.state = {text : this.props.text};
    }

     async changeState(event){
        if(this.state.changing && event.key === "Enter") {
            if (this.state.changing) {
                this.setState({text: this.state.formAPI.getState().values.text});
                axios({
                    method: 'PATCH',
                    url: 'http://localhost:8080' + this.props.apiURL,
                    data: {"name": this.state.formAPI.getState().values.text}
                });
            }
            this.setState({changing: !this.state.changing})
        } else if(!this.state.changing) {
            this.setState({changing: !this.state.changing})
        }
    }

    setFormAPI(newFormAPI){
        this.setState({formAPI: newFormAPI});
    }

    render() {
        if(this.state.changing){
            return (
                <div onKeyPress={this.changeState}>
                    <Form getApi={this.setFormAPI} initialValues={{text: this.state.text}}>
                        <Text field="text" id="textValue"/>
                    </Form>
                </div>
            );
        }else{
            return (
                <div onClick={this.changeState}>
                    {this.state.text}
                </div>
            );
        }
    }
}

export default ChangeableText;
